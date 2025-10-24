function updateChart(weekId) {
  const subjects = [
    { name: "math", color: "#ff0000" },
    { name: "Chem", color: "#ffff00" },
    { name: "EVS", color: "#00ff00" },
    { name: "FEE", color: "#00ffff" },
    { name: "EMSB", color: "blueviolet" },
    { name: "PPS", color: "deeppink" }
  ];

  const weekSection = document.getElementById(weekId);
  if (!weekSection) return;

  let values = subjects.map(subject => {
    const input = weekSection.querySelector(`input[data-subject="${subject.name}"]`);
    return parseFloat(input.value) || 0;
  });

  const total = values.reduce((a, b) => a + b, 0);

  const chart = document.getElementById(`chart-${weekId}`);
  if (!chart) return;

  if (total === 0) {
    chart.style.background = "conic-gradient(gray 0% 100%)";
    return;
  }

  let gradient = "";
  let start = 0;
  for (let i = 0; i < subjects.length; i++) {
    const percent = (values[i] / total) * 100;
    let end = start + percent;
    gradient += `${subjects[i].color} ${start}% ${end}%, `;
    start = end;
  }
  gradient = gradient.slice(0, -2);
  chart.style.background = `conic-gradient(${gradient})`;
}


window.onload = () => {
  for (let i = 1; i <= 8; i++) {
    updateChart(`week-${i}`);
  }
};
