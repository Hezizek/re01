struct vertex_to_fragment_struct {
	@builtin(position)	vertex_position: vec4<f32>
};

struct fragment_to_target_struct {
	@location(0) 	color: vec4<f32>
};

@vertex
fn vertex_main(@builtin(vertex_index) vertex_index_id: u32) -> vertex_to_fragment_struct {
    var vf: vertex_to_fragment_struct;

    switch(vertex_index_id){
	case 0:
		{
            vf.vertex_position = vec4(0.0, 0.5, 0.0, 1.0);
			break;
        }
	case 1:
		{
            vf.vertex_position = vec4(-0.5, -0.5, 0.0, 1.0);
			break;
        }
	default:
		{
            vf.vertex_position = vec4(0.5, -0.5, 0.0, 1.0);
			break;
        }
    }
    return vf;
}

@fragment
fn fragment_main(vf: vertex_to_fragment_struct) -> fragment_to_target_struct {
    var ft: fragment_to_target_struct;
    ft.color = vec4(1.0, 0.0, 0.0, 1.0);
    return ft;
}