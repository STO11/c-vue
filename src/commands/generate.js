
module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info }
    } = toolbox

    const fs = require('fs') , path = require('path');
    const htmlStream = require('web-html-stream');
    const ncp = require('ncp').ncp;

    const name = parameters.first;

    function handler(node, ctx) {
      return node;
    }
 
    function stripHtml(html){

        const inputStream = new ReadableStream({
            start(controller) {
                controller.enqueue(html);
                controller.close();
            }
        });

        var reader = new htmlStream.HTMLTransformReader(inputStream, {
            transforms: [{
              selector: {
                  nodeName: 'code',
                  //attributes: [['id', '=', 'teste']]
              },
              handler: handler,
              stream: false
            }],
            //ctx: { hello: 'world' }
        });

        reader.read()
        .then(async res => {
          //console.log(res.value);
          //return res.value;
          let codes = res.value;
          for(let i in codes)
          {
            if(codes[i].attributes)
            {
              let html = codes[i].innerHTML;
              let name = codes[i].attributes.name;
              await generate({
                template: 'model.js.ejs',
                target: `c-vue-components/${codes[i].attributes.name}-component.vue`,
                props: { html, name }
              });
              info(`Generated file at c-vue-components/${codes[i].attributes.name}-component.js`)
            }
          }
         
          return reader.read();
        }).then(res => { 
            //console.log(res)
          return res.value;
        });
    }

    // fs.readFile('./'+name, "utf8", async (err, data) => {
    //   if (err) {
    //     throw err;
    //   }
    //   await stripHtml(data);
    // });
    
    //destination = name;
    // ncp('./'+name, './'+destination, function (err) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log('done!');
    // });

    function walkDir(dir, callback) {
      fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
          walkDir(dirPath, callback) : callback(path.join(dir, f));
      });
    };

    walkDir('./'+name, function(filePath) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      stripHtml(fileContents);

      //console.log(filePath, fileContents);
    });



      // await generate({
      //   template: 'model.js.ejs',
      //   target: `${name}-component.vue`,
      //   props: { html }
      // });
    //info(`Generated file at models/${name}-model.js`)
  }
}
