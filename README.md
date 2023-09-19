# PMI-P1-Grupo1
Projeto proposto pela professora Rita, em PMI com intuito de aprendizagem de HTML, CSS e JavaScript.


    <!-- código da topnav -->
    <header>
        <ul class="topNav">
            <li class="dif"><a href=""><img src="" alt="Logo ENADE"></a></li>
            <li><a href="">Tutorial</a></li>
            <li><a href="">Sobre</a></li>
        </ul>
    </header>

    <!-- Container da questão -->
        <article class="container">
            <h1>Exame de Ciência da Computação (Bacharelado)</h1> <!-- Titulo da prova -->
            <h3>Questão 1:</h3> <!-- Numeração da questão -->
            <img src="../../img/Q1_text.PNG" alt="Imagem da Questão" > <!-- Ilustração da imagem -->
            <p><b>A partir das informações apresentadas, é correto afirmar que:</b></p> <!-- questão -->
            <!-- container das alternativas -->
            <div class="alter">
                <div>
                    <input type="radio" name="isgift" id="isgift0" value="0"/><!-- botão de input com os parametros -->
                    <label for="isgift0">A. O fator ambiental e o fator demográfico afetam a mobilidade social observada, sendo ela menor nos países que apresentam as maiores taxas de natalidade.</label><!-- Texto do input (alternativa) -->
                </div>
                <div>
                    <input type="radio" name="isgift" id="isgift1" value="1"/><!-- botão de input com os parametros -->
                    <label for="isgift1">B. A baixa organização social dos economicamente menos favorecidos determina a baixa mobilidade social da base para o topo da pirâmide.</label><!-- Texto do input (alternativa) -->
                </div>
                <div>
                    <input type="radio" name="isgift" id="isgift2" value="2"/><!-- botão de input com os parametros -->
                    <label for="isgift2">C. A mobilidade social é caracterizada por um fator ancestral que se revela ao longo das gerações, sendo um limitador da eficácia de políticas públicas de redução das desigualdades sociais.</label><!-- Texto do input (alternativa) -->
                </div>
                <div>
                    <input type="radio" name="isgift" id="isgift3" value="3"/><!-- botão de input com os parametros -->
                    <label for="isgift3">D. A análise de mobilidade social permite a observação de um ciclo vicioso, que se caracteriza por uma subida nas camadas sociais seguida de uma queda, repetindo-se esse ciclo de modo sucessivo.</label><!-- Texto do input (alternativa) -->
                </div>
                <div>
                    <input type="radio" name="isgift" id="isgift4" value="4"/><!-- botão de input com os parametros -->
                    <label for="isgift4">E. A ascensão social depende de fatores viabilizadores que estão fora do alcance das camadas pobres, o que ocasiona conflitos sociais em busca do acesso a tais fatores.</label><!-- Texto do input (alternativa) -->
                </div>
            </div>
            <!-- Container dos botões -->
            <div class="btns">
                <button type="submit" id="dif">Anterior</button><!-- Botão e seu texto-->
                <button type="submit">Verificar</button><!-- Botão e seu texto-->
                <button type="submit">Próxima</button><!-- Botão e seu texto-->
            </div>
        
        </article>
  
    <!-- Rodapé -->
    <footer class="botomNav">
        <img src="../../img/logoFatec.png" alt="Logo FATEC">
        <img src="../../img/logoADS.png" alt="Logo ADS">
        <img src="../../img/logoCPS.png" alt="Logo CPS">
    </footer>
