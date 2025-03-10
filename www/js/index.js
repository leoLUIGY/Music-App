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
document.addEventListener('deviceready',function(){
    
    let dirPath = cordova.file.externalRootDirectory;

    function listMusicFiles(path)
    {
        window.resolveLocalFileSystemURL(path, function(dirEntry) {
            let directoryReader = dirEntry.createReader();
            directoryReader.readEntries(function(entries){
                let musicFiles = [];
                for(let i = 0; i< entries.length; i++)
                {
                    let file = entries[i];
                    if(file.isFile && (file.name.endsWith(".mp3") || file.name.endsWith(".wav"))){
                        //musicFiles.push(file.name);
                        addMusicItem(file.name);
                    }
                }

            })
        })
    }
    listMusicFiles(dirPath);
}, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');


}


function addMusicItem(fileName) {
    let container = document.getElementById("body");

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("itemMusic");

    let link = document.createElement("a");
    link.innerText = fileName; // Exibir apenas o nome do arquivo

    itemDiv.appendChild(link);
    container.appendChild(itemDiv);
}