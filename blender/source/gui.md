# GUI

blender的[user interface](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/UI/UIParadigms/)注意基于三个原则

- **Non Overlapping**: The UI permits you to view all relevant options and tools at a glance
without pushing or dragging windows around

- **Non Blocking**: Tools and interface options do not block the user from any other parts of 
Blender. Blender doesn't popup requesters that require the user to fill in data before things
execute.

- **Non Modal**: User input should remain as a consistent and predictable as possible without 
changing commonly used methods(mouse, keyboard) on the fly.

However, after 2.5 permits multiple windows for multi-screen setup, it is an exception to 
the Non-Overlapping rule. 

