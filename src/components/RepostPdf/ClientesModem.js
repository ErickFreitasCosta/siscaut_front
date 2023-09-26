import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'


function ClientesPDF(Modens){

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle = [
        {
            text : 'TERMO DO QUANTITATIVO DE MODENS ',alignment :'center',
            fontSize : 15 ,
            bold : true,
            margin : [0 ,20, 0, 45] // esquerda ,cima ,direita ,baixo
            

        }
        

    ]

    // dados q estou recebendo
    const dados = Modens.map((Modem) =>{
        return[
            {text : Modem.modelo, fontSize :10 ,margin : [60, 2,10 ,2],},
            {text : Modem.marca, fontSize :10,margin : [60, 2,10 ,2],},
            {text : Modem.imei, fontSize :10 ,margin : [60, 2,10 ,2]}
        ]
    })





/////CONTEUDO
    const details = [
        // texto fixo anaixo do cabeçalho
        {         
             ul :  ['  ÓRGÃO: POLÍCIA MILITAR DO ESTADO DO PARÁ' ] ,margin : [60, 2,0 ,2]    
        },
        {
            ul: ['  UNIDADE: xxxxxxxxx' ], margin : [60, 2,0 ,2],
        },
        {
            ul: ['  CARGO/FUNÇÃO: xxxxxxxxxxxxx'] , margin : [60, 2,0 ,25],
        },

        {
            text : ['Eu, Nome : xxxxxxxx  ,RG xxxxx, declaro ter recebido o material abaixo descrito:'], margin : [53, 2,0 ,25]

        },



        {
            table :{
                headerRows : 1,
                widths : [120 , 120,180] ,
                // cabeçalho da tabela fixa
                body : [
                    [
                        {text : 'MODELO', style :'tableHeader',fontSize :10,margin : [60, 2,10 ,2],bold : true},
                        {text : 'MARCA', style :'tableHeader',fontSize :10 ,margin : [60, 2,10 ,2],bold : true},
                        {text : 'IMEI', style :'tableHeader',fontSize :10,margin : [90, 2,10 ,2],bold : true}
                    ],
                    // pega tudo que tinha dentro do array e adiciona mais tabela dinamica
                    ...dados
                   
                ]

            },
            layout : 'headerLineOnly',
            margin : [60, 2,0 ,2],
        }
        /// texto estático
,
        {
            text : ['Pelo presente termo assumo total e inteira responsabilidade pelo equipamento acima recebido, bem como, a de mantê-lo a salvo de perda, furto ou dano por má utilização, excetuado o desgaste natural de tempo e uso obrigando-me, por fim, a devolvê-lo em perfeito estado de uso e conservação ao Departamento Geral de Administração da Polícia Militar do Pará.'],margin : [30, 0,0 ,5] ,alignment: 'justify'
        },
        {
            text : ['A Polícia Militar do Estado do Pará através do Departamento Geral de Administração da PMPA e pelo Gestor do Contrato de Telefonia poderá, sob qualquer circunstância e em qualquer momento, solicitar informações de seu usuário, via esta linha telefônica, tendo o mesmo a obrigação de responder.'],margin : [30, 0,0 ,5],alignment: 'justify'
        },
        {
            text : ['Reconheço que o aparelho e a linha telefônica são de exclusividade da função de  CHEFE DA SEÇÃO DE CONTROLE DA QUALIDADE DO DGA devendo ser repassado ao meu substituto no ato de sua nomeação e informado a Departamento Geral de Administração (DGA) para que seja elaborado novo Termo de Responsabilidade de Usuário de Telefonia.'],margin : [30, 0,0 ,5],alignment: 'justify'
        },
       





    ]


    // Aqui é o rodapé para aparecer a quantidade de páginas q existem
    function Rodape(currentPage, pageCounf){
        return[
            {
                text : currentPage + ' /' + pageCounf,
                alignment : 'right',
                fontSize : 9 ,
               
                margin : [0 ,10, 20, 0]
    
            }
        ]

    }

    //////tamanho da página
    const docDefinitios = {
        pageSize: 'A4',
        pageMargins : [15 ,50 ,15 ,40],

        header : [reportTitle],
        content : [details] ,
        footer : Rodape
    }
    pdfMake.createPdf(docDefinitios).open()





}
export default ClientesPDF