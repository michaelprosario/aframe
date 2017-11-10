//Example crafted from https://aframe.io/docs/0.7.0/guides/building-a-minecraft-demo.html


AFRAME.registerComponent('random-color', {
	  dependencies: ['material'],
    init: function () 
    {
		  this.el.setAttribute('material', 'color', getRandomColor());
	  }
	});
	
//================================================================================
	
	function getRandomColor() {
	  const letters = '0123456789ABCDEF';
	  var color = '#';
	  for (var i = 0; i < 6; i++ ) {
		  color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
	}

//================================================================================
	
    /**
    * Snap entity to the closest interval specified by `snap`.
    * Offset entity by `offset`.
    */
    AFRAME.registerComponent('snap', {
      dependencies: ['position'],

      schema: {
        offset: { type: 'vec3' },
        snap: { type: 'vec3' }
      },

      init: function () {
        this.originalPos = this.el.getAttribute('position');
      },

      update: function () {
        const data = this.data;

        const pos = AFRAME.utils.clone(this.originalPos);
        pos.x = Math.floor(pos.x / data.snap.x) * data.snap.x + data.offset.x;
        pos.y = Math.floor(pos.y / data.snap.y) * data.snap.y + data.offset.y;
        pos.z = Math.floor(pos.z / data.snap.z) * data.snap.z + data.offset.z;

        this.el.setAttribute('position', pos);
      }
    });

//================================================================================	

    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      console.log(`Key pressed ${keyName}`);

      var key = keyName.toLowerCase();
      if (key === ' ') {
        var myCursor = document.getElementById("cursor");
        const data = myCursor.data;
        const el = myCursor;

        var point = myCursor.components.cursor.intersection.point;
        const spawnEl = document.createElement('a-entity');

        // Snap intersection point to grid and offset from center.
        spawnEl.setAttribute('position', point);
        spawnEl.setAttribute('mixin', 'voxel');

        // Append to scene.
        el.sceneEl.appendChild(spawnEl);
      } else if (key === 'r') {
        window.location = window.location.href;
		
      } else if (key === 'v') {
        var scene = document.querySelector("a-scene");
        scene.enterVR();
		
      } else if (key === 'c') {
        var myCursor = document.querySelector("a-cursor");
        var obj = myCursor.components.cursor.intersectedEl
        if (obj.id != "ground")
          myCursor.sceneEl.remove(obj);

      }

    }, false);
