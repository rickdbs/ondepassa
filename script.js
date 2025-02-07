import { differenceInHours } from "https://cdn.jsdelivr.net/npm/date-fns/differenceInHours.mjs";
import { parse } from "https://cdn.jsdelivr.net/npm/date-fns/parse.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const confrontos = [
    {
      timeCasa: "Corinthians",
      timeFora: "São Bernardo",
      logoCasa: "https://static.corinthians.com.br/img/escudos/SCCP_escudo-150px.png",
      logoFora: "https://upload.wikimedia.org/wikipedia/pt/e/e7/S%C3%A3o_Bernardo_Futebol_Clube_Logo.PNG",
      data: "09/02/2025",
      horario: "20:30",
      transmissoes: ["TNT", "MAX"]
    },
    {
      timeCasa: "Corinthians",
      timeFora: "Santos",
      logoCasa: "https://static.corinthians.com.br/img/escudos/SCCP_escudo-150px.png",
      logoFora: "https://media.santosfc.com.br/wp-content/uploads/2022/04/cropped-Asset-2.png",
      data: "12/02/2025",
      horario: "21:35",
      transmissoes: [
        "Cazé Tv",
        "PlayPlus",
        "R7",
        "Record",
        "Uol Play",
        "Nosso Futebol",
        "Zapping TV"
      ]
    },
    {
      timeCasa: "Portuguesa",
      timeFora: "Corinthians",
      logoCasa: "https://api.fpf.org.br/filiacao/v1/entidades/CLUBE/3347/escudo?v=53f27f80-f47e-4c5a-a57c-c334aef1e5f3",    
      logoFora: "https://static.corinthians.com.br/img/escudos/SCCP_escudo-150px.png",
      data: "15/02/2025",
      horario: "18:30",
      transmissoes: ["Uol Play", "Nosso Futebol","Zapping TV"]
    },
    {
      timeCasa: "Universidad Central",
      timeFora: "Corinthians",
      logoCasa: "https://resources-us.yinzcam.com/csf/shared/logos/CSF_UDC.png",    
      logoFora: "https://static.corinthians.com.br/img/escudos/SCCP_escudo-150px.png",
      data: "19/02/2025",
      horario: "21:30",
      transmissoes: ["Disney plus","Espn","Globo","Globoplay",]
    },
    {
      timeCasa: "Corinthians",
      timeFora: "Guarani",
      logoCasa: "https://static.corinthians.com.br/img/escudos/SCCP_escudo-150px.png",    
      logoFora: "https://api.fpf.org.br/filiacao/v1/entidades/CLUBE/242/escudo?v=91d1eccb-0171-415e-8308-1348888b4375",
      data: "23/02/2025",
      horario: "18:30",
      transmissoes: [
        "Cazé Tv",
        "PlayPlus",
        "R7",
        "Record",
        "Uol Play",
        "Nosso Futebol",
        "Zapping TV"
      ]
    },
    {
      timeCasa: "Corinthians",
      timeFora: "Universidad Central",
      logoCasa: "https://static.corinthians.com.br/img/escudos/SCCP_escudo-150px.png",    
      logoFora: "https://resources-us.yinzcam.com/csf/shared/logos/CSF_UDC.png",
      data: "26/02/2025",
      horario: "21:30",
      transmissoes: ["Disney plus","Espn","Globo","Globoplay",]
    }
  ];


  const channelsAndApps = [
    {
      name: "Cazé Tv",
      logo: "https://cadeojogo.com.br/assets/img/logo-cazetv.png",
    },
    {
      name: "TNT",
      logo: "https://www.pngkey.com/png/full/717-7171066_the-branding-source-cable-network-tnt-has-a.png",
    },
    {
      name: "MAX",
      logo: "https://images.cdn.prd.api.discomax.com/5feb/00e8e2daeeed.png?h=30&f=webp",
    },
    {
      name: "Zapping TV",
      logo: "https://telaviva.com.br/wp-content/uploads/2023/08/Zapping.png",
    },
    {
      name: "Nosso Futebol",
      logo: "https://cbfs.com.br/site/imagens/footer/nosso_futebol.png",
    },
    {
      name: "Uol Play",
      logo: "https://play.uol.com.br/static/media/logo_UOL_Final.99058e0e.svg",
    },
    {
      name: "Record",
      logo: "https://i0.wp.com/miramar.co.mz/wp-content/uploads/2022/02/logo-record-tv-azul-flat.png?quality=100&ssl=1",
    },
    {
      name: "PlayPlus",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADaklEQVR4Ab3UA7AbaxiH8b32HV57UG9yrdpWVNt2c7Kb2m2c2nY7qMdmPaxt2337HGzxzeF202/mOT75/zbS8jsb9dBb6/VQt7V66NIqPXR3hR7asUwPNV6qGx8u1A1tAWX0bNBDXwLYA0AAyAoCcHWJbqwEUB3AB3NBzKbUr0ZGAKUBnFcAAkAAXJuvGysAVAPw/gyXoaUpSU4CygK4kC+A5tMc3bg6y2UsA1Blust4LxsQJ6cAZZR7ID+AABAAV7gHlgColAASATGVJtKbAkiKGL8ccxkLAfw/zWW8Oykb4TYy+hCoAIkRgEvcA/MB/DcRyDgQY4qC+Pz+7F4GlANw0SZAphCAixPcxlwA/4x1G++MdJtamLIo33Grxi09TgEEgDB+YbTbnA3gL3onpCIY/Zn60yD6rV7rZm9vLhcu7SBAAAjj5023ORPAH/T2MBBDKBuwjSSvc96ALz2yRvfWAC47CRhBJjF+Lug20wDKDvw9F3CHxMpLXZu0ubHy1+Bjh+8BCyDDaajb3Ms98Gc24J4K6NKkjaz4dbgUCaAZlCIbABn8qxnOBty3DfjNlHSTMZJqPEYSf5oS00sEOMg9UCkb8MAWoAJXX3+0JCIxScTiksiaKrHmYyQCZIpe6HPgKs+BZcO4+4fppmYfUB6AZ6wkEnGiJAGJB6dKpNkYmQRkvOuVe+CqyTCAqrwM37deBY4BVEgMyGQg4/40r4/WjcUjXWaVEQwD0ILK+8BDxwAqJBqT2OjI0fiUWJsZ62d8Eh0X0fhddq8AHjkNUCF8vkvbyUOfWYiMA5QsyFaqR++8FmCuPYDVMfrFAjwuKWBBBVOmu4IytVXYzvhlitPnFuBJfoCV+QCWVuCu/zVLxlbsJ10btJO+vfuWdHgxVaL3SCsQ0L55K1n0x1BZz+BqhlfyeeGvQZnAcPeG7cXvC4jH75M+ffsUZ/iKOpwdRwEoDavTReb9OUTm/TFEJlXqIz0YDjDsDeRBfSqg6CtWxy3AU5L8auNpKW2btxS/328NWz0BsGvosKHbuMGnRV2xVb5HHVXz0svDtJcGNvd4vkkmE22KumLllBygDtN3pAHIHviJFtDMYl+xeko6bMWxht4u2ahy7AxzXgbYHrcAp14afkS7aYA67ORRAZ1pP+2jMP2U0WHlPAMoimBW35JLnQAAAABJRU5ErkJggg==",
    },
    {
      name: "Globo",
      logo: "https://logodownload.org/wp-content/uploads/2013/12/rede-globo-logo-4.png",
    },
    {
      name: "Globoplay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Globoplay-logo.png",
    },
    {
      name: "Disney plus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png",
    },
    {
      name: "Espn",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/ESPN_logos.png",
    },
    {
      name: "Sport tv",
      logo: "https://logodownload.org/wp-content/uploads/2017/07/sportv-logo-1-1.png",
    },
    {
      name: "Sbt",
      logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/4/41/Logotipo_do_SBT.svg/1200px-Logotipo_do_SBT.svg.png",
    },
    {
      name: "R7",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/R7_logo.svg",
    },
  ]

  

  const container = document.getElementById("confrontos");

  confrontos.forEach(match => {
    // Criação do card
    const card = document.createElement("div");
    card.className = "card";

    //Converte as datas atual e da partida para o tipo Date
    const actualHourAndDate = new Date() //Formato Date do Javascript
    const matchDateAndHour = parse(`${match.data} ${match.horario}`, 'dd/MM/yyyy HH:mm', new Date()); //Converte para o formato Date do Javascript
    

    //Compara a data do jogo com a data de Hoje.
    const result = differenceInHours(
      matchDateAndHour,
      actualHourAndDate
    )
    
    
    let isMatchLive = {}
    isMatchLive.status = false

    //Verifica se a data em que a página foi carregada está entre o inicio e o final da partida.
    if(result <= 0 && result > -2){
      isMatchLive.info = "• Ao vivo"
      isMatchLive.status = true

    }

    const spanLive = {}
    spanLive.className = "match-live"
    spanLive.value = isMatchLive.info
    
    // Logos dos times
    const logosDiv = document.createElement("div");
    logosDiv.className = "team-logos";

    const logoCasa = document.createElement("img");
    logoCasa.src = match.logoCasa;
    logoCasa.alt = match.timeCasa;
    logoCasa.title = match.timeCasa;
    
    const logoFora = document.createElement("img");
    logoFora.src = match.logoFora;
    logoFora.alt = match.timeFora;
    logoFora.title = match.timeFora;
    
    const versus = document.createElement("span")
    versus.className = "versus-letter"
    versus.textContent = "X"

    logosDiv.appendChild(logoCasa);
    logosDiv.appendChild(versus)
    logosDiv.appendChild(logoFora);
    card.appendChild(logosDiv);

    // Informações do confronto
    const matchInfo = document.createElement("div");
    matchInfo.className = "match-info";
    matchInfo.innerHTML = ` ${isMatchLive.status ? `<span class="${spanLive.className}">${spanLive.value}</span>` : ''}
                           <h2>${match.timeCasa} x ${match.timeFora}</h2>
                           <p>Data: ${match.data}</p>
                           <p>Horário: ${match.horario}</p>`;
    card.appendChild(matchInfo);

    // Canais e aplicativos de transmissão
    const transmissaoDiv = document.createElement("div");
    transmissaoDiv.className = "transmissao";
    transmissaoDiv.innerHTML = `<h3>Onde Assistir:</h3>`;
    
    
    const ul = document.createElement("ul");
    match.transmissoes.forEach(channelName => {
      
      const channelLogo = document.createElement("img");

      // Procura o canal correspondente
      const canalEncontrado = channelsAndApps.find(channel => channel.name === channelName);
    
      // Se encontrar, define o src da imagem
      if (canalEncontrado) {
        channelLogo.src = canalEncontrado.logo;
      }

      const li = document.createElement("li");
      li.appendChild(channelLogo)

      ul.appendChild(li);
    });



    transmissaoDiv.appendChild(ul);
    card.appendChild(transmissaoDiv);

    container.appendChild(card);
  });
});
