const commander = require('commander')
const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main () {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Hero")
        .option('-p, --poder [value]', "Poder do Hero")
        .option('-i, --id [value]', "ID do Hero")
        .option('-c, --cadastrar', "Cadastrar um Hero")
        .option('-l, --listar', "listar um Hero")
        .option('-r, --remover', "Remover um Hero pelo id")
        .option('-a, --atualizar [value]', "Atualizar um Hero")
        .parse(process.argv)
    const heroi = new Heroi(Commander)

    try {
        if(Commander.cadastrar) {            
            delete heroi.id

            const resultado = await Database.cadastrar(heroi)
            if(!resultado) {
                console.error('Heroi não foi cadastrado')
                return;
            }    
            console.log('Heroi Cadastrado com sucesso')
        }
        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if(commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado) {
                console.error('Não foi possivel resolver o heroi')
                return;
            }
            console.log('Heroi removido com sucesso!')
        }

        if(Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar);
            delete heroi.id;
            // remover todas as chaves que estiverem com undefined
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado) {
                console.error('Não foi possivel atualizar o HERO')
                return;
            }
            console.log('Heroi Atualizado com sucesso!')
        }

    } catch (error) {
        console.error('DEU RUIM', error)    
    }
}

main()