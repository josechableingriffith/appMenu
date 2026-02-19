import { supabase } from '../../lib/supabase';

export const POST = async ({ request, redirect }) => {
  try {
    // Leemos como FormData
    const data = await request.formData();
    
    // Extraemos los valores usando .get('nombre_del_input')
    const nombre = data.get('nombre');
    const precio = data.get('precio');
    const departamento = data.get('departamento');
    const tienda = data.get('tienda');
    const es_porcionable = data.get('es_porcionable') === "true"

    const { error } = await supabase
      .from('ingredientes')
      .insert([
        {
          nombre: nombre,
          precio: parseFloat(precio) || 0,
          departamento: departamento,
          tienda: tienda,
          es_porcionable: es_porcionable
        }
      ]);

    if (error) throw error;

    // Redirigir con éxito
    return redirect('/ingredientes?msg=success', 303);
    
  } catch (error) {
    console.error(error);
    // Redirigir con error (codificamos el mensaje para que sea seguro en la URL)
    const errorMsg = encodeURIComponent(error.message);
    return redirect(`/ingredientes?msg=error&detail=${errorMsg}`, 303);
  }
};