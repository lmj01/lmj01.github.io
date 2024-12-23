# coding = utf-8 
# https://pypi.org/project/DracoPy/
# https://github.com/seung-lab/DracoPy
# https://graphics.stanford.edu/data/3Dscanrep/
import os
import sys
import DracoPy

print(sys.getdefaultencoding())

with open('bunny.drc', 'rb') as draco_file:
    mesh = DracoPy.decode(draco_file.read())

print(f"number of points: {len(mesh.points)}")
print(f"number of faces: {len(mesh.faces)}")
print(f"number of normals: {len(mesh.normals)}")

# Note: If mesh.points is an integer numpy array,
# it will be encoded as an integer attribute. Otherwise,
# it will be encoded as floating point.
binary = DracoPy.encode(mesh.points, mesh.faces)
print(dir(binary))
# print(binary)
with open('bunny1.drc', 'wb') as test_file:
    test_file.write(binary)

# If faces is omitted, DracoPy will encode a point cloud
# binary = DracoPy.encode(mesh.points)

# Options for encoding:
# binary = DracoPy.encode(
#     mesh.points, faces=mesh.faces,
#     quantization_bits=14, compression_level=1,
#     quantization_range=-1, quantization_origin=None,
#     create_metadata=False, preserve_order=False,
#     colors=mesh.colors
# )