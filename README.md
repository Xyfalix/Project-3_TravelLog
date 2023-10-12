# TravelLog

## Table of Contents

1. [App Description](#App_Description)
2. [Technologies](#Technologies)
3. [Project Planning](#Project_Planning)
4. [App Functionality](#App_Functionality)
5. [Deployment](#Deployment)
6. [Key Challenges](#Key_Challenges)
7. [Future Developments](#Future_Developments)
   
## App Description

With the ability to create, customize, and complete your bucket list, TravelLog empowers you to plan your dream adventures. Not only can you discover new destinations, but you can also share your travel experiences and edit your reviews to ensure your stories are accurately told. Track your travel journey by marking destinations as "visted" on your bucketlist page. TravelLog is more than just a travel app; it's your personal travel companion, helping you turn your travel dreams into lasting memories.

## Technologies

- **FrontEnd**: ReactJS, DaisyUI & Tailwind CSS
- **BackEnd**: Mongoose, Express, Node.js
- **Database**: MongoDB
- **APIs**: Google Maps API, Wikipedia API & GeoCode API
- **Others**: JWT for authentication

## Project Planning
- **WireFrame (MIRO) & TrelloBoard:**
The development process for TravelLog began with the team outlining key user stories to define the app's functionality and user experience. To visualize the app's design, we used  [MIRO](https://miro.com/app/board/uXjVMknY8Us=/?share_link_id=856877434329) to create our wireframes. Using Miro, we meticulously crafted wireframes that illustrated the app's layout and user interface, providing a comprehensive visual representation of our vision. These wireframes served as the guiding framework, outlining the foundation upon which the app would be built. Additionally, we included Entity Relationship Diagrams (ERDs) to map out the relationships between different data entities within TravelLog.
These ERDs facilitated a deeper understanding of how user data, travel destinations, reviews, and other key components would interact, ensuring a smooth and efficient user experience. Overall, this meticulous planning and visualization process laid the groundwork for the TravelLog app's development. To further ensure that the team is on the right track, we utilised the [TrelloBoard](https://trello.com/b/Ps1MdnlB/travellog) to efficintly track the teams progress.
<img width="1112" alt="image" src="https://github.com/Xyfalix/travellog-app/assets/139415730/ed5c10b4-85c2-43f4-ab49-fa5124a0fa54">
<img width="718" alt="image" src="https://github.com/Xyfalix/travellog-app/assets/139415730/8326392d-6eeb-4277-b116-bbf1243f4462">

## App Functionality (Login/Sign Up --> Search Attraction --> Bucket List --> Review)

<img width="974" alt="image" src="https://github.com/Xyfalix/travellog-app/assets/139415730/de06f9d0-e669-4336-92d2-dbb49fa1e5e7">

1. Sign Up & Login as a user.
2. Search the city and attraction that interest you.
3. Explore the list of potential attractions to add to bucketlist.
4. If the user have visited that attraction already, they can tick it off their bucket list.
5. Users can view other peoples reviews on the attractions, or post their own.
   
## Deployment
The app is deployed on Render, and you can use it here:
[TravelLog](https://travel-log-uaie.onrender.com/)

## Key Challenges
Integrating multiple APIs into the TravelLog app presented a significant challenge during development. The complexity of harmonizing various APIs, each with its own structure, documentation, and authentication methods, demanded a thorough testing and integration effort from both the front-end and back-end, which was very time-consuming.

## Future Developments
- Implement flights & hotel bookings
- Implement user comments
- Advanced filters for Maps and Direction
