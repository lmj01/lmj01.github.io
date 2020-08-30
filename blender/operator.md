# 操作类型

在splash中有一个函数WM_operator_name_call，全局搜索它， 在intern/wm_event_system.c中实现了它

```c
int WM_operator_name_call(bContext *C, const char *opstring, short context, PointerRNA *properties)
{
  wmOperatorType *ot = WM_operatortype_find(opstring, 0);
  if (ot) {
    return WM_operator_name_call_ptr(C, ot, context, properties);
  }

  return 0;
}
```

对splash重要的是两个参数WM_OT_splash和WM_OP_INVOKE_DEFAULT， 字符串转换为内部的类型，在文件WM_types.h中

```c
typedef struct wmOperatorType {
	/** Text for UI, undo. */
	const char *name;
	/** Unique identifier. */
	const char *idname;
	const char *translation_context;
	/** Use for tool-tips and Python docs. */
	const char *description;
	/** Identifier to group operators together. */
	const char *undo_group;

    /** rna for properties */
    struct StructRNA *srna;

} wmOperatorType;
/**
 * Context to call operator in for #WM_operator_name_call.
 * rna_ui.c contains EnumPropertyItem's of these, keep in sync.
 */
enum {
  /* if there's invoke, call it, otherwise exec */
  WM_OP_INVOKE_DEFAULT,
  WM_OP_INVOKE_REGION_WIN,
  WM_OP_INVOKE_REGION_CHANNELS,
  WM_OP_INVOKE_REGION_PREVIEW,
  WM_OP_INVOKE_AREA,
  WM_OP_INVOKE_SCREEN,
  /* only call exec */
  WM_OP_EXEC_DEFAULT,
  WM_OP_EXEC_REGION_WIN,
  WM_OP_EXEC_REGION_CHANNELS,
  WM_OP_EXEC_REGION_PREVIEW,
  WM_OP_EXEC_AREA,
  WM_OP_EXEC_SCREEN,
};
```

在intern/wm_init_exit.c中

wm_operatortypes_init引入了ghash概念，所有的operator都挂载在一个ghash对象上

```c
/* called on initialize WM_init() */
void wm_operatortype_init(void)
{
  /* reserve size is set based on blender default setup */
  global_ops_hash = BLI_ghash_str_new_ex("wm_operatortype_init gh", 2048);
}
```

wm_operatortypes_register默认注册了一大推的operator， 其中就有WM_OT_splash. 可以看到这些OT的类别基本都是操作的常规操作， 把UI层的操作都分成大类。

其他的暂时还是不涉及，还是从splash入手分析，因为它很短，逻辑很清晰。

回到函数WM_operatortype_find入手

## wm_operator_type.c

```c
/* all ops in 1 list (for time being... needs evaluation later) */
void WM_operatortype_append(void (*opfunc)(wmOperatorType *))
{
  wmOperatorType *ot = wm_operatortype_append__begin();
  opfunc(ot);
  wm_operatortype_append__end(ot);
} 
```

每个operatortype都是一个通类型的函数指针，有一对函数wm_operatortype_append__begin和wm_operatortype_append__end来增加一个operatortype对象。

```c
/** \name Operator Type Append
 * \{ */

static wmOperatorType *wm_operatortype_append__begin(void)
{
  wmOperatorType *ot = MEM_callocN(sizeof(wmOperatorType), "operatortype");

  BLI_assert(ot_prop_basic_count == -1);

  ot->srna = RNA_def_struct_ptr(&BLENDER_RNA, "", &RNA_OperatorProperties);
  RNA_def_struct_property_tags(ot->srna, rna_enum_operator_property_tags);
  /* Set the default i18n context now, so that opfunc can redefine it if needed! */
  RNA_def_struct_translation_context(ot->srna, BLT_I18NCONTEXT_OPERATOR_DEFAULT);
  ot->translation_context = BLT_I18NCONTEXT_OPERATOR_DEFAULT;

  return ot;
}
static void wm_operatortype_append__end(wmOperatorType *ot)
{
  if (ot->name == NULL) {
    CLOG_ERROR(WM_LOG_OPERATORS, "Operator '%s' has no name property", ot->idname);
  }
  BLI_assert((ot->description == NULL) || (ot->description[0]));

  /* Allow calling _begin without _end in operatortype creation. */
  WM_operatortype_props_advanced_end(ot);

  /* XXX All ops should have a description but for now allow them not to. */
  RNA_def_struct_ui_text(
      ot->srna, ot->name, ot->description ? ot->description : UNDOCUMENTED_OPERATOR_TIP);
  RNA_def_struct_identifier(&BLENDER_RNA, ot->srna, ot->idname);

  BLI_ghash_insert(global_ops_hash, (void *)ot->idname, ot);
}
```

通过上面的代码可以看到一个operatortype主要的是与RNA绑定数据，都是显示的数据，最后插入ghash中。

全局搜索WM_operatortype_append在c源码中调用的地方，大致分三部分

- windowmanager moudle, 默认的，通过窗体表现的operatortype
- editors module， 编辑中定义的特定operatortype
- python moudle， 向外提供特定的operatortype的接口


