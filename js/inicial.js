document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item'); // Use uma classe comum para os itens

    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // Remove a classe 'active' de todos os itens
            menuItems.forEach(i => i.classList.remove('active'));

            // Adiciona a classe 'active' apenas ao item clicado
            this.classList.add('active');

            // Se você estiver usando navegação SPA (Single Page Application)
            // e não quer que a página recarregue ou mude o hash da URL imediatamente,
            // você pode prevenir o comportamento padrão do link:
            // event.preventDefault();

            // Aqui você pode adicionar a lógica para carregar o conteúdo correspondente
            // (ex: mudar o conteúdo da área principal baseado no href do link)
            console.log(`Menu clicado: ${this.textContent.trim()}`);
        });
    });

    // Opcional: Para manter o item ativo mesmo após um refresh se a URL for SPA
    // ou se você tiver um estado inicial.
    // Isso é mais complexo e geralmente envolve verificar a URL atual
    // e aplicar a classe 'active' ao item correspondente.
    // Exemplo simplificado (para URLs com hash):
    // const currentHash = window.location.hash;
    // if (currentHash) {
    //     const activeItem = document.querySelector(`.sidebar-menu a[href="${currentHash}"]`);
    //     if (activeItem) {
    //         menuItems.forEach(i => i.classList.remove('active'));
    //         activeItem.classList.add('active');
    //     }
    // } else {
    //    // Ativa o primeiro item por padrão se não houver hash e nenhum ativo inicial
    //    // menuItems[0].classList.add('active');
    // }
});