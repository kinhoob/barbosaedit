# Atualização do portfólio

- Adicionado “FIZEMOS A MAQUIAGEM DA KIKA!”, da Casa Clutch, aos trabalhos do YouTube. O player inicia normalmente, sem marcação de tempo.
- Os quatro endereços antigos do Instagram retornaram HTTP 403. Os endereços atuais foram obtidos diretamente das imagens dos perfis públicos e registrados em `photo-sources.json`.
- As fotos foram baixadas para `assets/instagram/`, e o HTML usa esses caminhos estáveis para não depender da expiração das assinaturas do Instagram.
- Identidade visual, ordem dos trabalhos existentes e imagem do hero preservados. A seção de trabalhos agora usa imagens empilhadas com rolagem nativa e título fixo, inspirada na seção Works de a-chen.webflow.io. Inclui versão móvel e respeito à preferência por movimento reduzido. Botão flutuante volta ao topo.

Validação local: JavaScript sem erros de sintaxe; quatro imagens carregadas no navegador com largura natural de 150 px; modal abre o iframe `https://www.youtube-nocookie.com/embed/fAV0r9yumKs?rel=0`, com título, capa e botão do player carregados.

Repositório de origem: `kinhoob/barbosaedit`.

Atualização: restaurado o carrossel horizontal original dos trabalhos a pedido do usuário. Mantidos botão de voltar ao topo, vídeo sem tempo inicial e fotos locais.
