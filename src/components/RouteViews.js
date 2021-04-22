import React from "react"
import { Route } from "react-router-dom"
// import { MessageForm } from "./message/MessageForm"



export const RouteViews = () => {
  return (
    <>
      <Route exact path="/">
        <h1>Home Page</h1>
        {/* Render the component for news articles */}
      </Route>

      {/* <Route path="/friends">
        <FriendsList />
      </Route>

      <Route exact path="/messages">
        <MessageList />
      </Route>

      <Route path="/messages/:messageId(\d+)/edit/">
        <MessageEdit />
      </Route>

      <Route exact path="/tasks">
        <TaskList />
      </Route>

      <Route path="/tasks/add">
        <TaskForm />
      </Route>

      <Route path="/tasks/:taskId(\d+)/edit/">
        <TaskEditForm />
      </Route>

      <Route exact path="/events">
        {<EventList />}
      </Route>
      <Route path="/events/create">
        {<EventForm />}
      </Route>
      <Route path="/events/:eventId(\d+)/edit">
        {<EditEvent />}
      </Route> */}
      
    </>
  );
}
