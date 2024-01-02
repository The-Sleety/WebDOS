document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    let currentDirectory = 'C:\\';
    const commandHistory = [];
    let historyIndex = 0;
    let directories = [ '']; // Array to store directories

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            commandHistory.unshift(command);
            historyIndex = 0;
            input.value = '';
            if (command === 'help') {
                output.innerHTML += `<br>${currentDirectory}> Available commands: <br>1. help - Show available commands <br>2. date - Display current date <br>3. time - Display current time <br>4. clear - Clear the screen <br>5. echo [message] - Display a message <br>6. ls - List files and directories <br>7. cd [directory] - Change directory <br>8. cat [filename] - View the contents of a text file <br>9. download [filename] - Download a text file <br>10. mkdir [directory] - Create a new directory`;
            } else if (command === 'date') {
                const currentDate = new Date().toLocaleDateString();
                output.innerHTML += `<br>${currentDirectory}> ${currentDate}`;
            } else if (command === 'time') {
                const currentTime = new Date().toLocaleTimeString();
                output.innerHTML += `<br>${currentDirectory}> ${currentTime}`;
            } else if (command === 'clear') {
                output.innerHTML = '';
            } else if (command.startsWith('echo ')) {
                const message = command.slice(5);
                output.innerHTML += `<br>${currentDirectory}> ${message}`;
            } else if (command === 'ls') {
                output.innerHTML += `<br>${currentDirectory}> Files: File1.txt File2.txt`;
                output.innerHTML += `<br>${currentDirectory}> Directories: ${directories.join(' ')}`;
            } else if (command.startsWith('cd ')) {
                const newDirectory = command.slice(3);
                output.innerHTML += `<br>${currentDirectory}> Changing directory to ${newDirectory}`;
                currentDirectory = `${currentDirectory}\\${newDirectory}`;
            } else if (command.startsWith('cat ')) {
                const filename = command.slice(4);
                output.innerHTML += `<br>${currentDirectory}> Contents of ${filename}: This is the content of the file.`;
            } else if (command.startsWith('download ')) {
                const filename = command.slice(9);
                const blob = new Blob(['This is the content of the file.'], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                output.innerHTML += `<br>${currentDirectory}> Downloading ${filename}`;
            } else if (command.startsWith('mkdir ')) {
                const directoryName = command.slice(6);
                directories.push(directoryName); // Add the new directory to the array
                output.innerHTML += `<br>${currentDirectory}> Creating directory ${directoryName}`;
            } else {
                output.innerHTML += `<br>${currentDirectory}> '${command}' is not recognized as an internal or external command, operable program or batch file.`;
            }
        } else if (event.key === 'ArrowUp') {
            if (historyIndex < commandHistory.length) {
                input.value = commandHistory[historyIndex];
                historyIndex++;
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                input.value = '';
            }
        }
    });
});
