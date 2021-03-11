const d = document;


$productos = d.getElementById('productos'),
$template = d.getElementById('producto-template').content,
$fragment = d.createDocumentFragment();

d.addEventListener('keypress', async e => {
   if(e.target.matches('#busqueda')){
       //console.log(e.key,e.keyCode)
       if(e.key === 'Enter') {
           try{
               let query = e.target.value.toLowerCase()
                   api = `https://api.mercadolibre.com/sites/MLA/search?q=​:${query}`,
                   res = await fetch(api),
                   json = await res.json();

             console.log(api, res, json)

             if(!res.ok) throw { status: res.status, statustText: res.statustText} //captura el error

             if(json.lenght === 0) {
                 $productos.innerHTML = `<h2>No existen resultados con su criterio de busqueda ${query}<h2>`
             } else{

                function pintarProducto (json){
                    $template.querySelector("h2").textContent = json.results[0].title;
                    let $clone = d.importNode($template, true);
                    $fragment.appendChild($clone);

                }


             for (let i = 0; i=4; i++){
                 pintarProducto(i)
             }

             
             } 



           } catch(err){
            console.log(err);
            let message = err.statustText || 'Ocurrio un error';
            $productos.innerHTML = `<p>Error${err.status}: ${message} </p>`
           }
       }
   }
})


/* json.forEach(el =>{
    $template.querySelector("h2").textContent = el.results[0].title;

    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
});

$productos.appendChild($fragment) 
}  */