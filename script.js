function validateForm1() {
    const namaInput = document.getElementById('nama');
    const usiaInput = document.getElementById('usia');

    // Validasi input
    if (namaInput.value.trim() === '' || usiaInput.value.trim() === '') {
        alert('Mohon lengkapi data diri Anda dengan Benar.');
    } else {
        showForm2();
    }
}

function showForm2() {
    console.log('Button Next clicked');
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
}

function fuzzyMembership(value, type) {
    if (type === 'Low') {
        if (value <= 5) return 1;
        if (value <= 10) return (10 - value) / 5;
        return 0;
    } else if (type === 'Medium') {
        if (value <= 5 || value > 20) return 0;
        if (value <= 10) return (value - 5) / 5;
        if (value <= 15) return 1;
        return (20 - value) / 5;
    } else if (type === 'High') {
        if (value <= 15) return 0;
        if (value <= 20) return (value - 15) / 5;
        if (value <= 25) return 1;
        return 0;
    }
}

function fuzzyReadinessMembership(value, type) {
    if (type === 'Low') {
        if (value <= 10) return 1;
        if (value <= 20) return (20 - value) / 10;
        return 0;
    } else if (type === 'Medium') {
        if (value <= 20) return 0;
        if (value <= 40) return (value - 20) / 20;
        if (value <= 60) return 1;
        if (value <= 70) return (70 - value) / 10;
        return 0;
    } else if (type === 'High') {
        if (value <= 50) return 0;
        if (value <= 60) return (value - 50) / 10;
        if (value <= 100) return 1;
        return 0;
    }
}

function showResults(event) {
    event.preventDefault();
    
    const problemSolving = parseInt(document.getElementById('problemSolving').value);
    const leadership = parseInt(document.getElementById('leadership').value);
    const communication = parseInt(document.getElementById('communication').value);
    const teamwork = parseInt(document.getElementById('teamwork').value);

    document.getElementById('valProblemSolving').innerText = problemSolving;
    document.getElementById('valLeadership').innerText = leadership;
    document.getElementById('valCommunication').innerText = communication;
    document.getElementById('valTeamwork').innerText = teamwork;

    const fuzzyProblemSolving = {
        low: fuzzyMembership(problemSolving, 'Low'),
        medium: fuzzyMembership(problemSolving, 'Medium'),
        high: fuzzyMembership(problemSolving, 'High')
    };

    const fuzzyLeadership = {
        low: fuzzyMembership(leadership, 'Low'),
        medium: fuzzyMembership(leadership, 'Medium'),
        high: fuzzyMembership(leadership, 'High')
    };

    const fuzzyCommunication = {
        low: fuzzyMembership(communication, 'Low'),
        medium: fuzzyMembership(communication, 'Medium'),
        high: fuzzyMembership(communication, 'High')
    };

    const fuzzyTeamwork = {
        low: fuzzyMembership(teamwork, 'Low'),
        medium: fuzzyMembership(teamwork, 'Medium'),
        high: fuzzyMembership(teamwork, 'High')
    };

    function setHighlight(idLow, idMedium, idHigh, fuzzyValues) {
        const elementLow = document.getElementById(idLow);
        const elementMedium = document.getElementById(idMedium);
        const elementHigh = document.getElementById(idHigh);

        elementLow.innerHTML = fuzzyValues.low > 0 ? `<span class="highlight3">Low (${fuzzyValues.low.toFixed(2)})</span>` : `<span class="lowlight">Low (${fuzzyValues.low.toFixed(2)})</span>`;
        elementMedium.innerHTML = fuzzyValues.medium > 0 ? `<span class="highlight2">Medium (${fuzzyValues.medium.toFixed(2)})</span>` : `<span class="lowlight">Medium (${fuzzyValues.medium.toFixed(2)})</span>`;
        elementHigh.innerHTML = fuzzyValues.high > 0 ? `<span class="highlight1">High (${fuzzyValues.high.toFixed(2)})</span>` : `<span class="lowlight">High (${fuzzyValues.high.toFixed(2)})</span>`;
    }

    setHighlight('fuzzyProblemSolvingLow', 'fuzzyProblemSolvingMedium', 'fuzzyProblemSolvingHigh', fuzzyProblemSolving);
    setHighlight('fuzzyLeadershipLow', 'fuzzyLeadershipMedium', 'fuzzyLeadershipHigh', fuzzyLeadership);
    setHighlight('fuzzyCommunicationLow', 'fuzzyCommunicationMedium', 'fuzzyCommunicationHigh', fuzzyCommunication);
    setHighlight('fuzzyTeamworkLow', 'fuzzyTeamworkMedium', 'fuzzyTeamworkHigh', fuzzyTeamwork);

    const totalScore = problemSolving + leadership + communication + teamwork;

    let readiness;
    if (totalScore >= 70) {
        readiness = 'Lulus';
    } else if (totalScore >= 40) {
        readiness = 'Mengulang';
    } else {
        readiness = 'Tidak Lulus';
    }


    const nama = document.getElementById('nama').value;
    const usia = document.getElementById('usia').value;
    const readinessMessage = `Atas nama ${nama}, dengan usia saat ini yaitu ${usia} Tahun.
     \nBerdasarkan hasil Analisis Kompetensi Soft skills, kamu dinyatakan "${readiness}". \n\nSaran: Terus tingkatkan dan konsisten dalam mengasah kompetensi soft skills kamu agar dapat menunjang prestasi di lingkungan akademik maupun non-akademik serta prospek karir kamu kedepan!`;

    document.querySelector('td[data-predikat-nilai]').innerText = readiness;
    document.querySelector('td[data-predikat-derajat]').innerText = readinessMessage;

    document.getElementById('form2').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}