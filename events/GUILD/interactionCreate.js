import fs from 'fs';

const components = [];
fs.readdirSync(`./interactions/components/`).forEach((dir) => {
  const files = fs.readdirSync(`./interactions/components/${dir}/`).filter((file) => file.endsWith('.js'));

  files.forEach((file) => {
    let i = import(`../../interactions/components/${dir}/${file}`).then((module) => module.default);

    if (i) {
      components.push(i);
    }
  });
});

const modals = [];
fs.readdirSync(`./interactions/modals/`).forEach((dir) => {
  const files = fs.readdirSync(`./interactions/modals/${dir}/`).filter((file) => file.endsWith('.js'));

  files.forEach((file) => {
    let modal = import(`../../interactions/modals/${dir}/${file}`).then((module) => module.default);

    if (modal) {
      modals.push(modal);
    }
  });
});

const Interaction = async (data, commands) => {
  if (data.d.type === 3) {
    let id = data.d.data.custom_id;
    let component = components.find((i) => id.startsWith(i.customId));
    component.run(data.d, id);
  } else if (data.d.type === 5) {
    let id = data.d.data.custom_id;
    let modal = modals.find((i) => id.startsWith(i.customId));
    modal.run(data.d, id);
  } else if (data.d.type === 2) {
    let cmd = commands[data.d.data.name];
    try {
      cmd.run(data.d);
    } catch (err) {
      console.log(err);
    }
  }
};

export { Interaction };

