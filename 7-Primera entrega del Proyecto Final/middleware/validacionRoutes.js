module.exports= {
    validarRoutes(req, res){
        
        const path = req.originalUrl;
        const metodo = req.method;
        
        res.status(401).json({
                error: -2,
                descripcion:`ruta ${path} método ${metodo} no implementada`
        });
    }
}