document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    let currentDirectory = 'C:\\';
    const commandHistory = [];
    let historyIndex = 0;
    const files = [];
    let directories = []; // Array to store directories


    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            commandHistory.unshift(command);
            historyIndex = 0;
            input.value = '';
            if (command === 'help') {
                output.innerHTML += `<br>${currentDirectory}> Available commands: <br>HELP                       Show available commands <br>DATE                       Display current date <br>TIME                       Display current time <br>CLS                        Clear the screen <br>ECHO [message]             Display a message <br>LS                         List files and directories <br>CD [directory]             Change directory <br>CAT [filename]             View the contents of a text file <br>DOWNLOAD [filename]        Download a text file <br>MKDIR [directory]          Make a new directory. <br>CREATE [file name]         Creates a new file with .txt, .html, .css or .js extentions.`;
            } else if (command === 'date') {
                const currentDate = new Date().toLocaleDateString();
                output.innerHTML += `<br>${currentDirectory}> ${currentDate}`;
            } else if (command === 'time') {
                const currentTime = new Date().toLocaleTimeString();
                output.innerHTML += `<br>${currentDirectory}> ${currentTime}`;
            } else if (command === 'cls') {
                output.innerHTML = '';
            } else if (command.startsWith('echo ')) {
                const message = command.slice(5);
                output.innerHTML += `<br>${currentDirectory}> ${message}`;
            } else if (command === 'ls') {
                let filesOutput = files.map(file => `${file.name}.${file.extension}`);
                output.innerHTML += `<br>${currentDirectory}> Files: ${filesOutput.join(' ')} Readme.md`;
                output.innerHTML += `<br>${currentDirectory}> Directories: ${directories.join(' ')}`;
            } else if (command.startsWith('cd ')) {
                const newDirectory = command.slice(3);
                output.innerHTML += `<br>${currentDirectory}> Changing directory to ${newDirectory}`;
                currentDirectory = `${currentDirectory}\\${newDirectory}`;
            } else if (command.startsWith('cat ')) {
                const filename = command.slice(4);
                output.innerHTML += `<br>${currentDirectory}> Contents of ${filename}: This is the content of the file.`;
            } else if (command === 'doom') {
                output.innerHTML = '<iframe src="http://browser-doom.io/?page=game&game=doom&profile=2002%3A%20A%20Doom%20Odyssey%20(Freedoom)" width="100%" height="800px"></iframe>'; 
             
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
            
            } else if (command.startsWith('create ')) {
                const fileNameWithExtension = command.slice(7); // Assuming the command is 'create filename.extension'
                
                // Extracting the file name and extension
                const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
                const fileName = fileNameWithExtension.slice(0, lastDotIndex);
                const fileExtension = fileNameWithExtension.slice(lastDotIndex + 1);

                // Check if the extension is valid (you can add more extensions as needed)
                if (['txt', 'js', 'html', 'css'].includes(fileExtension)) {
                    // Your logic to create the file goes here
                    const newFile = {
                        name: fileName,
                        extension: fileExtension
                    };

                    // Push the created file into the 'files' array
                    files.push(newFile);

                    output.innerHTML += `<br>${currentDirectory}> Creating file ${fileNameWithExtension}`;
                } else {
                    output.innerHTML += `<br>${currentDirectory}> Invalid file extension: ${fileExtension}`;
                }
    
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
