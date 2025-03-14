/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('deviceready', function () {
    console.log("deviceready event fired!");
    navigator.splashscreen.hide(); // Manually hide the splash screen

    if (!cordova.plugins || !cordova.plugins.permissions) {
        console.error("Permissions plugin not available!");
        return;
    }

    var permissions = cordova.plugins.permissions;

    // Define the list of permissions to request
    var list = [];
    if (device.version >= "13") {
        list.push(permissions.READ_MEDIA_AUDIO); // For Android 13+
    } else {
        list.push(permissions.READ_EXTERNAL_STORAGE); // For Android 10–12
    }

    // Check if permissions are already granted
    permissions.checkPermission(list, function (status) {
        if (status.hasPermission) {
            console.log("Permissions already granted!");
            startApp(); // Proceed with your app logic
        } else {
            // Request permissions if not granted
            permissions.requestPermissions(list, function (status) {
                if (status.hasPermission) {
                    console.log("Permissions granted!");
                    startApp(); // Proceed with your app logic
                } else {
                    console.log("Permissions denied!");
                    alert("Permissions are required to access audio files. Please enable 'Media' permissions manually in the app settings.");
                }
            }, function (error) {
                console.error("Error requesting permissions: ", error);
            });
        }
    }, function (error) {
        console.error("Error checking permissions: ", error);
    });
}, false);

function startApp() {
    console.log("Starting the app...");
    acessarArquivos();
}


function acessarArquivos() {
    console.log("Tentando acessar arquivos...");
    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + 'Music/', function (dirEntry) {
        console.log("Music directory:", dirEntry);
        listMP3Files(dirEntry);
    }, onError);
    

}

function listMP3Files(dirEntry) {
    var dirReader = dirEntry.createReader();
    dirReader.readEntries(function (entries) {
        entries.forEach(function (entry) {
            console.log("Entry found:", entry.name, entry.isFile ? "File" : "Directory");
        
            if (entry.isDirectory) {
                if (entry.name !== "." && entry.name !== "..") {
                    listMP3Files(entry);
                }
            } else if (entry.isFile && entry.name.trim().toLowerCase().endsWith('.mp3')) {
                console.log("MP3 file found:", entry.name);
                addMusicItem(entry.toURL());
            }
        });
    }, onError);
}
function onError(error) {
    switch (error.code) {
        case FileError.NOT_FOUND_ERR:
            console.error("File or directory not found:", error);
            break;
        case FileError.SECURITY_ERR:
            console.error("Security error: Access denied:", error);
            break;
        case FileError.ABORT_ERR:
            console.error("Operation aborted:", error);
            break;
        default:
            console.error("Error accessing files:", error);
    }
}


function addMusicItem(filePath) {
    let container = document.getElementById("body");

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("itemMusic");

    let link = document.createElement("a");
    link.innerText = filePath.split('/').pop(); // Exibir apenas o nome do arquivo
    link.href = filePath; // Permite clicar no link para acessar o arquivo
    link.setAttribute("target", "_blank");

    itemDiv.appendChild(link);
    container.appendChild(itemDiv);
}
