// ///////////////////////		component	constructor		//////////////////////////////////
// function construct_component(my_part, my_component_parameter) {
//   this.part = my_part;
//   this.component_parameter = my_component_parameter;

//   this.render = this.part.render;
//   this.webgpu = this.part.webgpu;

//   this.create = async function () {
//     return this;
//   };
//   this.draw = function (pass_encoder) {
//     pass_encoder.setPipeline(this.render.pipeline);
//     pass_encoder.draw(3);
//   };
// }

// ///////////////////////		part	constructor		//////////////////////////////////
// function construct_part(my_render, my_part_parameter) {
//   this.render = my_render;
//   this.part_parameter = my_part_parameter;

//   this.webgpu = this.render.webgpu;

//   this.create = async function () {
//     return this;
//   };
//   this.create_component = async function (my_component_parameter) {
//     return new construct_component(this, my_component_parameter).create();
//   };
// }

// ///////////////////////		render	constructor		//////////////////////////////////

// function construct_render(my_webgpu, my_render_parameter) {
//   this.webgpu = my_webgpu;
//   this.render_parameter = my_render_parameter;

//   this.create = async function () {
//     var server_promise = await fetch(this.render_parameter.shader_url);
//     if (!server_promise.ok) {
//       alert("execute shader fetch,status is " + server_promise.status);
//       return null;
//     }
//     var shader_text = await server_promise.text();
//     var shader_module = this.webgpu.device.createShaderModule({
//       code: shader_text,
//     });

//     var my_pipeline = this.webgpu.device.createRenderPipeline({
//       layout: "auto",
//       vertex: {
//         module: shader_module,
//         entryPoint: "vertex_main",
//       },
//       fragment: {
//         module: shader_module,
//         entryPoint: "fragment_main",
//         targets: [
//           {
//             format: this.webgpu.gpu.getPreferredCanvasFormat(),
//           },
//         ],
//       },
//       primitive: {
//         topology: "triangle-list",
//       },
//     });

//     this.pipeline = my_pipeline;

//     return this;
//   };
//   this.create_part = async function (my_part_parameter) {
//     return await new construct_part(this, my_part_parameter).create();
//   };
// }

// export const create_render = async function (my_webgpu, my_render_parameter) {
//   return await new construct_render(my_webgpu, my_render_parameter).create();
// };


///////////////////////		component	constructor		///////////////////////
class construct_component {
  constructor(my_part, my_component_parameter) {
    this.part = my_part;
    this.component_parameter = my_component_parameter;

    this.render = my_part.render;
    this.webgpu = my_part.webgpu;
  }

  async create() {
    return this;
  }

  draw(pass_encoder) {
    pass_encoder.setPipeline(this.render.pipeline);
    pass_encoder.draw(3);
  }
}

///////////////////////		part	constructor		///////////////////////
class construct_part {
  constructor(my_render, my_part_parameter) {
    this.render = my_render;
    this.part_parameter = my_part_parameter;

    this.webgpu = my_render.webgpu;
  }

  async create() {
    return this;
  }

  async create_component(my_component_parameter) {
    return new construct_component(this, my_component_parameter).create();
  }
}

///////////////////////		render	constructor		///////////////////////
class construct_render {
  constructor(my_webgpu, my_render_parameter) {
    this.webgpu = my_webgpu;
    this.render_parameter = my_render_parameter;
  }

  async create() {
    const server_promise = await fetch(this.render_parameter.shader_url);
    if (!server_promise.ok) {
      alert("execute shader fetch, status is " + server_promise.status);
      return null;
    }

    const shader_text = await server_promise.text();
    const shader_module = this.webgpu.device.createShaderModule({
      code: shader_text,
    });

    this.pipeline = this.webgpu.device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: shader_module,
        entryPoint: "vertex_main",
      },
      fragment: {
        module: shader_module,
        entryPoint: "fragment_main",
        targets: [
          {
            format: this.webgpu.gpu.getPreferredCanvasFormat(),
          },
        ],
      },
      primitive: {
        topology: "triangle-list",
      },
    });

    return this;
  }

  async create_part(my_part_parameter) {
    return new construct_part(this, my_part_parameter).create();
  }
}

///////////////////////		export		///////////////////////
export async function create_render(my_webgpu, my_render_parameter) {
  return new construct_render(my_webgpu, my_render_parameter).create();
}
