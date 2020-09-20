#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>

#define ID_STR_LEN 10
#define NAME_STR_LEN 10

typedef struct student {
    char id[ID_STR_LEN];
    char name[NAME_STR_LEN];
    uint8_t age;
}student;

student *create_student() 
{
    student *stu = (student*)malloc(sizeof(student));
    if (stu == NULL) {
        return NULL;
    }
    memset(stu, 0, sizeof(student));
    return stu;
}

void destory_student(student *stu)
{
    if (stu) free(stu);
}

static void init_student(student *stu)
{
    assert(stu);
    const char *id = "20200919";
    const char *name = "meijie";
    uint8_t age = 33;
    memcpy(stu->id, id, strlen(id));
    memcpy(stu->name, name, strlen(name));
    stu->age = age;
}

static int handle_student(uintptr_t handle)
{
    if (handle==0) {
        return -1;
    }
    student *stu = (student*)handle;
    printf("id: %s, name: %s, age: %d\n", stu->id, stu->name, stu->age);
    return 0;
}

const char *pad_up_4(const char *ptr) {
    return (const char*)((((uintptr_t)ptr)+3) & ~3);
    // return (const char*)((((uintptr_t)ptr)+3) );
}

void testPointerPadding() {
    int val = 0x12345678;
    const char *cp = (const char*)&val;
    printf("%p\n", cp);
    cp = pad_up_4(cp);
    cp = pad_up_4(cp);
    printf("%p\n", cp);
}


int main(int argc, char **argv) 
{
    int a = 0x13, b = 0x02, c = 0x04;

    printf("%d, %d, %d, %d \n", (a +3) & ~3,
            (b+3) & ~3,
            (c+3) & ~3, 
            ~3);
    printf("\n");
    for (int i=0; i<20; i++) {
        printf("%d, ", (i +3) & ~3);
    }
    printf("\n");
    
    testPointerPadding();

    student * stu;

    stu = create_student();
    
    const char *cp = (const char*)stu;
    printf("the pointer %p \n", cp);
    cp = pad_up_4(cp);
    printf("the padd 4 pointer %p \n", cp);

    init_student(stu);
    
    uintptr_t handle = (uintptr_t)stu;
    handle_student(handle);

    destory_student(stu);

    return 0;
}