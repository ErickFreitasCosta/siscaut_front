import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'


function ClientesPDF(Ht){

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle = [
        {
            text : 'TERMO DO QUANTITATIVO DE HT ',alignment :'center',
            fontSize : 15 ,
            bold : true,
            margin : [0 ,20, 0, 45] // esquerda ,cima ,direita ,baixo
            

        }
        

    ]

    // dados q estou recebendo
    const dados = Ht.map((hts) =>{
        return[
            {text : hts.base, fontSize :10,margin : [0, 2,10 ,2],},
            {text : hts.marca, fontSize :10,margin : [0, 2,10 ,2],},
            {text : hts.modelo, fontSize :10 ,margin : [0, 2,10 ,2]},
            {text : hts.nserie, fontSize :10 ,margin : [0, 2,10 ,2]}
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
                widths : ['*' , '*','*','*'] ,
                // cabeçalho da tabela fixa  -  esquerda ,cima ,direita ,baixo
                body : [
                    [
                        {text : 'BASE', style :'tableHeader',fontSize :10 ,margin : [0, 2,10 ,2],bold : true},
                        {text : 'MARCA', style :'tableHeader',fontSize :10 ,margin : [0, 2,10 ,2],bold : true},
                        {text : 'MODELO', style :'tableHeader',fontSize :10,margin : [0, 2,10 ,2],bold : true},
                        {text : 'NºSERIE', style :'tableHeader',fontSize :10,margin : [0, 2,10 ,2],bold : true}
                    ],
                    // pega tudo que tinha dentro do array e adiciona mais tabela dinamica
                    ...dados
                   
                ]

            },
            layout : 'headerLineOnly',
            // distancia da tabela
            margin : [15, 2,0 ,8],
        }
        /// texto estático
,
        

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