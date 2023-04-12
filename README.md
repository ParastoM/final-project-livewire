# final-project-livewire
Final project by Parasto Moragheb for cb-wd-23a

Livewire is an application I worked on as my final project for Concordia's Full Stack Web Development Bootcamp. The idea was to create a space that serves as a search tool for concerts, as a personal event keeper / organizer, and as a small community where users can interact with one another. It was an opportunity for me to go back in time to the year 2005 - being a teen, having a MySpace account, downloading songs (and viruses) from LimeWire onto the family computer, keeping all my concert ticket stubs, and having music be the entirety of my life.

Livewire can be used by all to search for any artist's tour dates, by way of BandsInTown's API. Users with accounts can log in (via Auth0), save events they will be attending, and comment on events. A user's profile displays all the events they will be attending by date. 

To start the application, make way to the server terminal and yarn start. Repeat in the client terminal.

The Homepage consists of a search bar, a log in button, 3 randomely generated events, and 3 randomely generated artists (on click, you will be able to see all their tour dates).
<img src="https://imgur.com/MXfQEbF"/>

The Event page consists of a single event with a "I'll be there" button for logged in users - once clicked, the event is saved on the user's profile as a reminder of the upcoming show. 
![Homepage](https://imgur.com/kxI6nY2)

The Artist page consists of all the upcoming tour dates for a given artist. Any clicked event will bring a user to the Event page of that given concert listing. 
<img src="https://imgur.com/NmHAuzh"/>

The Profile page, as explained earlier, displays a list of all the events a logged in user has said they will be attending by click of a button. In terms of design, I would love to make the individual listings look like ticket stubs (just to further the nostalgia factor). 
<img src="https://imgur.com/UKSFTUO"/>



Truly, this is the bare bones of it. There is so much space for growth and development in this project. From making visual designs to adding more technical aspects (like following / friending users), the possibilities are many and the potential for learning is exponential. 

This MERN project is the first project that I have built from nothing - which is crazy to think of considering I did not know how to write a single line of code 4 months ago. It was not easy. I would not have been able to do this without the help of my instructors and tutor. Some of the main difficulties I encountered doing this project can be summed in the following points: 

- The API I picked out wasn't ideal - I could only work with two endpoints. It made retracting information more complicated. I should have spent more time researching better APIs to use - lesson learned!
- The code isn't as clean as I would have liked it to be. Many states, variables, and  have similar names, and it does get confusing. But that's something for me to work on once I've taken a step back and digested what the past 3 months have consisted of. 

Of course, this was a huge learning curve - but the learning isn't over, and I'm looking forward to seeing how it changes and develops as I continue to learn. 
