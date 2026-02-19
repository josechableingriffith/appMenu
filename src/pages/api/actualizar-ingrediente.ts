import { supabase } from '../../lib/supabase';

export const POST = async ({ request, redirect }) => {
  try {
    const data = await request.formData();
    
    // El ID es obligatorio para una actualización
    const id = data.get('id');
    
    if (!id) {
      throw new Error("No se proporcionó un ID válido para actualizar.");
    }

    const nombre = data.get('nombre');
    const precio = data.get('precio');
    const departamento = data.get('departamento');
    const tienda = data.get('tienda');
    const es_porcionable = data.get('es_porcionable') === "true";

    const { error } = await supabase
      .from('ingredientes')
      .update({
        nombre: nombre,
        precio: parseFloat(precio) || 0,
        departamento: departamento,
        tienda: tienda,
        es_porcionable: es_porcionable
      })
      .eq('id', id); // Filtro crucial para no actualizar toda la tabla

    if (error) throw error;

    // Redirigir con éxito
    return redirect('/ingredientes?msg=success', 303);
    
  } catch (error) {
    console.error("Error al actualizar:", error);
    const errorMsg = encodeURIComponent(error.message);
    return redirect(`/ingredientes?msg=error&detail=${errorMsg}`, 303);
  }
};