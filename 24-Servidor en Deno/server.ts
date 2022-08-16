import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

localStorage.clear();

const port = 8080;

const handler = (request: Request) => {
  const { pathname } = new URL(request.url)

  switch (pathname) {
    case '/':
      return new Response(localStorage.getItem('color'))
      break;
    case '/colores':
      const url = new URL(request.url)
      const q = url.searchParams.get('color')
      let colors: string[]= JSON.parse(localStorage.getItem('color') || '[]')
      colors.push(q || '')
      const colores = localStorage.setItem('color', JSON.stringify(colors))
      return new Response(localStorage.getItem('color'))
      break;
  }
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });