# Group 6: Centralized Machine Problems Repository

[![Python 3.11](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/downloads/release/python-311/)
[![Streamlit](https://img.shields.io/badge/Built%20with-Streamlit-FF4B4B.svg)](https://streamlit.io)
[![GitHub](https://img.shields.io/badge/View%20on-GitHub-green.svg)](https://github.com/JpCurada/g6-mp2-desalgo)

## Table of Contents
- [Overview](#overview)
- [Branch Structure](#branch-structure)
- [Directory Structure](#directory-structure)
- [Group Members](#group-members)
- [Environment Setup](#environment-setup)
- [Usage](#usage)

## Overview
This repository serves as the centralized hub for all machine problems (MPs) of Group 6 in the Design and Analysis of Algorithms course. Each machine problem is developed and maintained in its own branch, while the `main` branch compiles all completed and reviewed work. This repository is intended solely for the use of Group 6 members as part of their coursework.

## Branch Structure
- **mp2-dev**: Development branch for Machine Problem 2
- **mp3-dev**: Development branch for Machine Problem 3
- **mp4-dev**: Development branch for Machine Problem 4
- **mp5-dev**: Development branch for Machine Problem 5
- **main**: Compilation of all finalized machine problems and documentation

## Directory Structure
- `adr/` — Algorithm Design Reports and documentation, organized by machine problem
- `src/algorithms/` — Source code for algorithms, organized by paradigm and machine problem
- `machine_problems/` — Problem statements and reference materials

## Group Members
- CURADA, John Paul M.
- ZARAGOZA, Marie Criz 
- LUCERO, Ken Audie S.
- FAELDONIA, Elias Von Isaac R. 
- OJA, Ma. Izabelle L.
- RACELIS, Michael Richmond V.
- CANSINO, Florence Lee F.
- RAMILO, Gian G.
- MAGTANONG, Gabriel Andre E.

## Environment Setup

### Installing Python
1. Open Windows PowerShell and execute:
   ```
   winget install -e --id Python.Python.3.11
   ```
2. During installation, ensure you check the `Add to PATH` option.
3. Verify installation:
   ```
   python --version
   ```

### Installing Package Manager
We'll use UV as our package manager:

1. Open Windows PowerShell and run:
   ```
   powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

## Usage

1. **Clone the repository:**
   ```
   git clone https://github.com/JpCurada/g6-machine-problems-daa.git
   cd g6-machine-problems-daa
   ```
2. **Switch to the desired branch:**
   ```
   git checkout mp2-dev   # or mp3-dev, mp4-dev, mp5-dev, main
   ```
3. **Install dependencies:**
   ```
   uv install
   ```
4. **Run the Streamlit application (if available):**
   ```
   streamlit run src/streamlit_app.py
   ```
5. **Open your browser and go to** `http://localhost:8501`

---

*This repository is for academic use only by Group 6 members of the Design and Analysis of Algorithms course. 











