import OpenGL
from OpenGL.GL import *
from OpenGL.GLU import *
from OpenGL.GLUT import *

def drawFunc():
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glRotate(0.1, 5, 5, 0)
    glutWireTeapot(0.5)
    glFlush()

if __name__ == "__main__":
    glutInit()
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGBA)
    glutInitWindowPosition(0, 0)
    glutInitWindowSize(400, 400)
    glutCreateWindow("opengl")
    glutDisplayFunc(drawFunc)
    glutIdleFunc(drawFunc)
    glutMainLoop()
    