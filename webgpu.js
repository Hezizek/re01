// function construct_webgpu(my_canvas) {
//   this.canvas = document.getElementById(my_canvas);

//   this.create = async function () {
//     this.gpu = await navigator.gpu;
//     this.adapter = await this.gpu.requestAdapter();
//     this.device = await this.adapter.requestDevice();

//     this.context = this.canvas.getContext("webgpu");
//     this.context.configure({
//       device: this.device,
//       format: this.gpu.getPreferredCanvasFormat(),
//       usage: GPUTextureUsage.COPY_DST + GPUTextureUsage.RENDER_ATTACHMENT,
//       alphaMode: "premultiplied",
//     });
//     return this;
//   };
// }

// export const create_webgpu = async function (my_canvas) {
//   return await new construct_webgpu(my_canvas).create();
// };

class construct_webgpu {
  constructor(my_canvas) {
    this.canvas = document.getElementById(my_canvas);
  }

  async create() {
    this.gpu = navigator.gpu;
    if (!this.gpu) {
      throw new Error("WebGPU is not supported in this browser.");
    }

    this.adapter = await this.gpu.requestAdapter();
    if (!this.adapter) {
      throw new Error("Failed to get GPU adapter.");
    }

    this.device = await this.adapter.requestDevice();
    this.context = this.canvas.getContext("webgpu");

    this.context.configure({
      device: this.device,
      format: this.gpu.getPreferredCanvasFormat(),
      usage: GPUTextureUsage.COPY_DST + GPUTextureUsage.RENDER_ATTACHMENT,
      alphaMode: "premultiplied",
    });

    return this;
  }
}

export async function create_webgpu(my_canvas) {
  return new construct_webgpu(my_canvas).create();
}
