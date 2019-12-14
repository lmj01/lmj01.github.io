
# Java

> java,

***

## 语言特性
- **泛型**：
    * 泛型通配符：T,K/V, ?, E

### setter&getter

为了控制依赖，使用了setter和getter。遵守一个原则：**尽量让别人来依赖接口而非实现，控制getter就是一种较好的途径**

### 反射机制

在运行状态中，对于任意一个类，都能知道这个类的所有属性和方法；对于任意一个对象，都能调用它们的任意一个方法和属性。这种动态获取的信息以及动态调用对象的方法的功能称为Java语言的反射机制

即编译后，这些信息都是可获取的，在语言层面提供了支持。

### 注解

与C语言中的宏是类似功能，Java的注解是在class文件文件基础上的东西，class文件里面是没有注解的，注解的形式是便于编译器在处理class时关联Annotation信息，通过反射去获取信息。

#### 元注解

java.lang.annotation里面定义了4种原语

- @Target，用于明确被修饰的类型，方法，字段，类，接口等
- @Retention，描述注解的生命周期
  1. RetentionPolicy.RUNTIME 注解会在class字节码文件中存在，运行时反射即可获得
  2. RetentionPolicy.CLASS,注解会在class字节码文件中存在，但运行时不能获取
  3. RetentionPolicy.SOURCE，仅存在源码中，class字节码中不存在
- @Documented
- @Jnherited

#### 自定义注解

