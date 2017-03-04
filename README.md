# Mashed Potatoes
###Let out that inner DJ!!!
Mashed Potatoes is a DJ platform/set which allows you to select two different audio sources, manipulate them independently, and play them back simultaneously. 

<img src="assets/images/mashed_potatoes.png">

##Installation
 In order to use the app you'll need to have this chrome extension [CORS](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) installed.
 Once installed, Rock the crowd. [Launch App](https://mashed-potatoes.herokuapp.com/)

##Technologies Used
- HTML
- CSS
- Javascript
- React
- [Tone](https://github.com/Tonejs/Tone.js/)


###Build Strategy
1. I did a rough sketch of what I wanted the app to look like with the features I wanted it to have 
2. Before building the skeleton I had to first find out how I was going to manipulate the audio, to bring the features to life. Luckily, a collegue of mine introduced me to [Tone JS](https://github.com/Tonejs/Tone.js/), a Web Audio framework for creating interactive music in the browser. As soon as saw what it was capable of I started experimenting with it. Tried testing out the features I wanted for the app.
3. I found a site that would host my mp3 files, [Kiwi6](http://kiwi6.com/), so that I would be able to fetch them later.
I ran into some 'cross-origin resource sharing' issues, when trying to fetch my sound files, but I had a [chrome extention](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) installed that allowed me to access my files and get me through the production process. 
4. Having somewhere to host my audio, and a way to manipulate it, I started building the app in [React](http://reactjs.cn/react/index.html) because I knew I would have a lot of moving parts that would be dynamic based on user input.

###...the rough sketch
<img src="assets/images/mashSketch.jpg">

###Complications/Future Improvements
1. Ran into some cross-origin resources sharing issues, so a [chrome extention](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) is needed when using the app, in order to fetch the sound files.
2. I wanted to give the user the ability to 'scratch', 'rewind', 'forward', the track by touching the record itself but was unable to link the animation with the controls.
3. I want to incorporate a user profile system, so that users can create, save and share their mix.
4. Right now you have to do multiple clicks on a certain parameter to manipulate the audio. I want make that a little smoother, by either changing it to a hold/release type of function or creating slider buttons.
5. A DJ gave me this tip, great advise. I want to add a cue button, that 'on click' would save that 'time' or point in the record and allow the user to jump back to that point on click.
Should help with finding and keeping the '1' when blending records.
6. Right now I have a list of records that the user can choose from, but I want to incorporate a way for users to search for, and import records they want to mashup.

Look out for these upcoming features!



##Author
Calvin Bowen Jr
