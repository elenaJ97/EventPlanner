using Application.Events;
using Application.Events.Actions;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEvents([FromQuery] EventParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("listall")]
        public async Task<IActionResult> GetAllEvents()
        {
            return HandleResult(await Mediator.Send(new ListAll.Query{}));
        }        

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent(Event e)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = e }));            
        }

        [Authorize(Policy = "IsAdminOrEventHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event e)
        {
            e.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Event = e }));            
        }        

        [Authorize(Policy = "IsAdminOrEventHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));            
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}