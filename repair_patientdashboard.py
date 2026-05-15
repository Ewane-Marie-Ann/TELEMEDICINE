from pathlib import Path

path = Path(r'C:\Users\pc\Desktop\TELEMEDICINE\src\pages\PatientDashboard.jsx')
text = path.read_text()
text = text.replace('\\n', '\n')
path.write_text(text)
print('Repaired PatientDashboard.jsx')
