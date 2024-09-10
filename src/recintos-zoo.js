
class RecintosZoo {
    constructor() {
        
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
        
        
        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(especie, quantidade) {
       
        if (!this.animais[especie]) {
            return { erro: "Animal inválido" };
        }

        
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animal = this.animais[especie];
        let recintosViaveis = [];

    
        this.recintos.forEach(recinto => {
            const espacoOcupado = recinto.animais.reduce((acc, a) => acc + this.animais[a.especie].tamanho * a.quantidade, 0);
            const espacoExtra = (recinto.animais.length > 0 && recinto.animais[0].especie !== especie) ? 1 : 0;
            const espacoNecessario = animal.tamanho * quantidade + espacoExtra;

           
            if (animal.biomas.includes(recinto.bioma) && (recinto.tamanhoTotal - espacoOcupado) >= espacoNecessario) {
                
                const carnivoroNoRecinto = recinto.animais.some(a => this.animais[a.especie].carnivoro);
                if (animal.carnivoro && carnivoroNoRecinto) {
                    return;  
                }
                if (animal.especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
                    return;  
                }

                const espacoLivre = recinto.tamanhoTotal - espacoOcupado - espacoNecessario;
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: recintosViaveis.sort() };
    }
}

export { RecintosZoo as RecintosZoo };
