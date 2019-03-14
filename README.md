# audio-visualizer

<h1>Quiri</h1>

<p>React-based voice recognition web app that redirects you to a website. Built using react, web-audio-api, and react-speech-reacognition. Speech recognition is sensitive, make sure to use in a quiet environment.</p>

| Command                                | What It Does                                              |
| -------------                          |:-------------:                                            |
| facebook                               | Redirects to Facebook.com                                 |
| google **whatever you want to search** | Redirects to a google search page based off of your voice |
| linkedin                               | Redirtects to linkedin                                    |
| youtube                                | Redirects to youtube                                      |
| space jam                              | Special surprise                                          |
| add website                            | Add a website to the command list                         |
| remove **command name**                | Removes specified command from command list               |  


<h3>Known Bugs</h3>
<ul>
	<li>Microphone doesnt pick up audio when add website form is open.</li>
	<li>Recognition Transcript doesn't show up immediately, instead shows up after first command has been spoken.</li>
</ul>