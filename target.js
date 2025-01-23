function construct_target(my_webgpu) {
  this.webgpu = my_webgpu;

  this.create = async function () {
    return this;
  };
  this.begin_draw = function () {
    this.command_encoder = this.webgpu.device.createCommandEncoder();
    this.pass_encoder = this.command_encoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.webgpu.context.getCurrentTexture().createView(),
          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    });
  };
  this.do_draw = function (my_component_array) {
    for (var i = 0, ni = my_component_array.length; i < ni; i++)
      my_component_array[i].draw(this.pass_encoder);
  };
  this.end_draw = function () {
    this.pass_encoder.end();
    this.webgpu.device.queue.submit([this.command_encoder.finish()]);
  };
}
export const create_target = async function (my_webgpu) {
  return await new construct_target(my_webgpu).create();
};
