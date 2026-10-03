
/* REGISTROS DEMONSTRATIVOS PARA A ÁREA DE GESTÃO */
const registrosGestao = [
    {
        maquina: "09",
        data: "22/09/2026",
        turno: "A",
        ocorrencia: "Falha no sensor",
        procedimento: "Substituição do sensor",
        resultado: "Falha permaneceu",
        status: "continuidade"
    },
    {
        maquina: "09",
        data: "22/09/2026",
        turno: "B",
        ocorrencia: "Falha no sensor",
        procedimento: "Teste do painel",
        resultado: "Investigar cabeamento",
        status: "aberta"
    },
    {
        maquina: "17",
        data: "22/09/2026",
        turno: "B",
        ocorrencia: "Temperatura elevada",
        procedimento: "Monitoramento da temperatura",
        resultado: "Em observação",
        status: "continuidade"
    },
    {
        maquina: "23",
        data: "22/09/2026",
        turno: "A",
        ocorrencia: "Parada emergencial",
        procedimento: "Substituição do componente",
        resultado: "Equipamento liberado",
        status: "resolvida"
    }
];

/* MOSTRAR OS REGISTROS NA TABELA */
function filtrarGestao() {
    const maquina = document.getElementById("filtroMaquina").value;
    const status = document.getElementById("filtroStatus").value;
    const tabela = document.getElementById("tabelaGestao");
    const semRegistros = document.getElementById("semRegistros");

    const encontrados = registrosGestao.filter(registro => {
        const maquinaOK =
            maquina === "todas" || registro.maquina === maquina;
        const statusOK =
            status === "todos" || registro.status === status;

        return maquinaOK && statusOK;
    });

    tabela.replaceChildren();

    encontrados.forEach(registro => {
        const linha = document.createElement("tr");

        [
            "Máquina " + registro.maquina,
            registro.data,
            "Turno " + registro.turno,
            registro.ocorrencia,
            registro.procedimento,
            registro.resultado,
            registro.status === "resolvida"
                ? "Resolvida"
                : registro.status === "continuidade"
                    ? "Em continuidade"
                    : "Pendente"
        ].forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        tabela.appendChild(linha);
    });

    semRegistros.classList.toggle("hidden", encontrados.length > 0);
}

/* RESUMO DEMONSTRATIVO DO HISTÓRICO */
function analisarHistorico() {
    const maquina = document.getElementById("maquinaAnalise").value;
    const resultado = document.getElementById("resultadoGestaoIA");

    const registros = registrosGestao.filter(
        registro => registro.maquina === maquina
    );

    resultado.replaceChildren();
    resultado.classList.remove("hidden");

    const titulo = document.createElement("b");
    titulo.textContent = "Resumo inteligente — Máquina " + maquina;
    resultado.appendChild(titulo);

    if (registros.length === 0) {
        resultado.appendChild(
            document.createTextNode(" Não há registros disponíveis.")
        );
        return;
    }

    const pendentes = registros.filter(
        registro => registro.status !== "resolvida"
    );

    const problemas = [...new Set(
        registros.map(registro => registro.ocorrencia)
    )];

    const resumo = document.createElement("p");
    resumo.textContent =
        "Foram encontrados " + registros.length +
        " registro(s). Ocorrências: " + problemas.join(", ") + ".";
    resultado.appendChild(resumo);

    const situacao = document.createElement("p");
    situacao.textContent = pendentes.length
        ? "Existem " + pendentes.length +
        " registro(s) que precisam de acompanhamento."
        : "Os registros consultados estão marcados como resolvidos.";
    resultado.appendChild(situacao);

    const recomendacao = document.createElement("p");
    recomendacao.textContent = maquina === "09"
        ? "Verificar o resultado da troca do sensor e investigar o cabeamento antes de repetir o procedimento."
        : maquina === "17"
            ? "Consultar as medições de temperatura e confirmar o resultado dos testes."
            : "Consultar o registro da substituição do componente e confirmar a liberação do equipamento.";

    resultado.appendChild(recomendacao);

    const aviso = document.createElement("small");
    aviso.textContent =
        "Demonstração baseada em regras e dados fictícios; não é uma IA conectada.";
    resultado.appendChild(aviso);
}

function showPage(id, btn) {
    // Esconde somente as páginas principais
    document.querySelectorAll("main > section").forEach(section => {
        section.classList.add("hidden");
    });

    // Mostra a página selecionada
    const page = document.getElementById(id);

    if (page) {
        page.classList.remove("hidden");
        window.scrollTo(0, 0);
    }

    // Atualiza o botão ativo do menu inferior
    document.querySelectorAll("nav button").forEach(button => {
        button.classList.remove("active");
    });

    if (btn) {
        btn.classList.add("active");
    }
}

function organizar() {
    document.getElementById("resultado").classList.remove("hidden");
}