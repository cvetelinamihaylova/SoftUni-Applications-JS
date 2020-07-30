(function () {
  const templates = {};
  const loadingBoxEl = document.getElementById('loadingBox');
  const infoBoxEl = document.getElementById('infoBox');
  const errorBoxEl = document.getElementById('errorBox');
  toggleLoader();

  function getTemplates(templatePath) {
    const existingTemplate = templates[templatePath];
    if (existingTemplate) { return Promise.resolve(existingTemplate); }
    return fetch(`./templates/${templatePath}.hbs`)
      .then(res => res.text())
      .then(templateStr => {
        const template = Handlebars.compile(templateStr);
        templates[templatePath] = template;
        return template;
      })
  };

  function renderTemplate(path, context, swapFn) {
    return getTemplates(path).then(templateFn => {
      const content = templateFn(context)
      swapFn(content);
    })
  };


  function toggleLoader(showLoader) {
    if (showLoader) {
      loadingBoxEl.style.display = 'block';
    } else {
      loadingBoxEl.style.display = 'none';
    }
  }

  function onCreateFurniture(redirectFn) {
    const createBtn = document.getElementById('create-btn');
    const makeEl = document.getElementById('new-make');
    const modelEl = document.getElementById('new-model');
    const yearEl = document.getElementById('new-year');
    const descriptionEl = document.getElementById('new-description');
    const priceEl = document.getElementById('new-price');
    const imageEl = document.getElementById('new-image');
    const materialEl = document.getElementById('new-material');

    createBtn.addEventListener('click', function () {
      const inputs = [
        makeEl,
        modelEl,
        yearEl,
        descriptionEl,
        priceEl,
        imageEl,
        materialEl
      ];
      const values = inputs.map(v => v.value);
      const missingValueIndex = values.findIndex(v => !v);
      if (missingValueIndex !== -1) {
        console.error('Missing data!', values[missingValueIndex]);
        return;
      };
      const data = values.reduce((acc, curr, index) => {
        const currInputEl = inputs[index];
        acc[currInputEl.name] = curr;
        return acc;
      }, {});
      const url = 'https://furniture-3f336.firebaseio.com/furniture.json';
      fetch(url, {
        'method': 'POST',
        'headers': {
          'Content-type': 'application/json'
        },
        'body': JSON.stringify(data)
      }).then(() => {
        redirectFn('#/')
      })
    });
  }

  function loadRegisterPartials(templatePath, templateName) {
    return fetch(`./templates/partials/${templatePath}.hbs`).then(res => res.text()).then(templateStr => {
      Handlebars.registerPartial(
        templateName,
        templateStr
      )
    })
  }

  function loadFurniture() {
    return fetch('https://furniture-3f336.firebaseio.com/furniture.json')
      .then(res => res.json())
      .then(data => {
        return Object.keys(data).reduce((acc, currId) => {
          const currItem = data[currId];
          return acc.concat({ id: currId, ...currItem });
        }, []);
      })
  }
  function loadFurnitureWithId(id) {
    return fetch(`https://furniture-3f336.firebaseio.com/furniture/${id}.json`)
      .then(res => res.json());
  }
  const app = Sammy('#container', function () {
    //this.use('Handlebars', 'hbs');

    this.before({}, function () {
      toggleLoader(true);
    });

    this.get('#/', function () {
      Promise.all([
        loadFurniture(),
        loadRegisterPartials('furniture-item', 'furnitureItem'),
      ])
        .then(([furniture]) => { renderTemplate('home', { furniture }, this.swap.bind(this)) })
        .then(() => { toggleLoader(false); });
    });
    this.get('#/profile', function () {
      renderTemplate('profile-page', {}, this.swap.bind(this)).then(() => {
        toggleLoader(false);
      });
    });
    this.get('#/create-furniture', function () {
      renderTemplate('create-furniture', {}, this.swap.bind(this)).then(() => {
        toggleLoader(false);
        onCreateFurniture(this.redirect.bind(this));
      });
    });
    this.get('#/furniture-details/:id', function (context) {
      const id = context.params.id;
      loadFurnitureWithId(id)
        .then(furniture => {
          renderTemplate('furniture-details', { furniture }, this.swap.bind(this));
        })
        .then(() => {
          toggleLoader(false);
        });
    });
  })
  app.run('#/');
})();