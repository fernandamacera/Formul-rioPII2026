import express from 'express'

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const formularioHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Centro de Adoção de Pets</title>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    background-color: #fce4ec; 
                    color: #333; 
                    margin: 0; 
                    padding: 5%; 
                    box-sizing: border-box; 
                }
                h2 { text-align: center; color: #d81b60; font-size: 2.2rem; margin-bottom: 10px; }
                p { text-align: center; font-size: 1.2rem; margin-bottom: 40px; }
                form { width: 100%; display: flex; flex-direction: column; }
                label { font-weight: bold; margin-top: 20px; margin-bottom: 10px; font-size: 1.1rem; }
                input[type="text"], select { 
                    width: 100%; 
                    padding: 18px; 
                    border: 2px solid #ccc; 
                    border-radius: 8px; 
                    box-sizing: border-box; 
                    font-size: 1.1rem; 
                }
                button { 
                    width: 100%; 
                    padding: 20px; 
                    background-color: #d81b60; 
                    color: white; 
                    border: none; 
                    border-radius: 8px; 
                    font-size: 1.3rem; 
                    font-weight: bold; 
                    margin-top: 40px; 
                    cursor: pointer; 
                    transition: 0.3s; 
                }
                button:hover { background-color: #ad1457; }
            </style>
        </head>
        <body>
            <h2>🐾 Adoção de Pets🐾</h2>
            <p>Preencha os dados para adotar seu novo companheiro!</p>
            
            <form action="/certidao" method="POST">
                <label for="nome">Nome do Pet:</label>
                <input type="text" id="nome" name="nome" placeholder="Ex: Jubileu" required>

                <label for="especie">Espécie do Animal:</label>
                <select id="especie" name="especie" required>
                    <option value="">Selecione uma espécie...</option>
                    <option value="Dragão">Dragão</option>
                    <option value="Capivara">Capivara</option>
                    <option value="Gato">Gato</option>
                    <option value="Calopsita">Calopsita</option>
                    <option value="Pinguim">Pinguim</option>
                    <option value="Unicórnio Rebaixado">Unicórnio Rebaixado</option>
                    <option value="Cachorro Caramelo">Cachorro Caramelo</option>
                </select>

                <label for="fofura">Nível de Fofura / Periculosidade:</label>
                <select id="fofura" name="fofura" required>
                    <option value="">Avalie a criatura...</option>
                    <option value="Inofensivo">Inofensivo</option>
                    <option value="Fofo, mas rouba sua comida">Fofo, mas rouba sua comida</option>
                    <option value="Vai destruir o sofá, mas eu amo">Vai destruir o sofá, mas eu amo</option>
                    <option value="Perigo Biológico Nível 4 (Muito fofo)">Perigo Biológico Nível 4 (Muito fofo)</option>
                </select>

                <label for="habilidade">Habilidade Especial:</label>
                <input type="text" id="habilidade" name="habilidade" placeholder="Ex: Ficar invisível" required>

                <button type="submit">Gerar Certidão de Adoção</button>
            </form>
        </body>
        </html>
    `;
    res.send(formularioHTML);
});

app.post('/certidao', (req, res) => {
    const { nome, especie, fofura, habilidade } = req.body;

    if (!nome || !especie || !fofura || !habilidade) {
        res.status(400).send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2 style="color: red;">❌ Adoção Interrompida!</h2>
                <p>Você precisa preencher todos os dados do seu pet.</p>
                <a href="/"><button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Voltar ao Formulário</button></a>
            </div>
        `);
    } else {
        const tabelaHTML = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Certidão Oficial</title>
                <style>
                    body { font-family: 'Courier New', Courier, monospace; background-color: #f4f4f9; display: flex; flex-direction: column; align-items: center; padding: 40px; }

                    .documento { background-color: white; padding: 40px; border: 2px solid #333; box-shadow: 5px 5px 0px #d81b60; max-width: 600px; width: 100%; }

                    h2 { text-align: center; border-bottom: 2px dashed #333; padding-bottom: 10px; margin-bottom: 30px; }

                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 16px; }

                    th, td { border: 1px solid #333; padding: 12px; text-align: left; }

                    th { background-color: #fce4ec; width: 35%; }

                    .btn-voltar { display: block; text-align: center; background-color: #333; color: white; padding: 15px; text-decoration: none; font-weight: bold; border-radius: 5px; transition: 0.3s; }

                    .btn-voltar:hover { background-color: #d81b60; }
                </style>
            </head>
            <body>
                <div class="documento">
                    <h2>📜 CERTIDÃO OFICIAL DE ADOÇÃO📜</h2>
                    
                    <table>
                        <tbody>
                            <tr>
                                <th>Nome Escolhido</th>
                                <td><strong>${nome.toUpperCase()}</strong></td>
                            </tr>
                            <tr>
                                <th>Espécie Registrada</th>
                                <td>${especie}</td>
                            </tr>
                            <tr>
                                <th>Grau de Periculosidade</th>
                                <td>${fofura}</td>
                            </tr>
                            <tr>
                                <th>Habilidade</th>
                                <td>${habilidade}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p style="text-align: center; font-style: italic; margin-bottom: 30px;">
                        "Declaro, para os devidos fins, que serei responsável por alimentar e não deixar essa criatura destruir o mundo."
                    </p>

                    <a href="/" class="btn-voltar">⬅ Adotar Outro Pet</a>
                </div>
            </body>
            </html>
        `;
        
        res.send(tabelaHTML);
    }
});

app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});




