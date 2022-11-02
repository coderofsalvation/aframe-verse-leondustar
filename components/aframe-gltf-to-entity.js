AFRAME.registerComponent('gltf-to-entity', {
  schema: {
    from: {default: '', type: 'selector'},
    name: {default: ''},
    duplicate: {type:'boolean',  "default":false}
  },

  init: function () {
    var el = this.el;
    var data = this.data;
console.dir(data.from)
    data.from.addEventListener('model-loaded', evt => {
      var model;
      var subset;
      model = evt.detail.model;
      subset = model.getObjectByName(data.name);
      if (!subset){
        console.error("Sub-object", data.name, "not found in #"+data.from.id);
        return;
      }
      if( !this.data.duplicate ) subset.parent.remove(subset)
      el.setObject3D('mesh', subset.clone());
      el.emit('model-loaded', el.getObject3D('mesh'));
    });
  }
});
