# 5034_3D_eastsidefab

```
For view skinned mesh

gltf.scene.traverse((child) => {
      if ( child.type == 'SkinnedMesh' ) {
        child.frustumCulled = false;
      }
});

``` 