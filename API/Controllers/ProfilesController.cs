using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Application.Profiles.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProfiles()
        {
            return HandleResult(await Mediator.Send(new ListAll.Query{}));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [Authorize(Policy = "IsAdminOrCurrentUser")]
        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Username = username }));            
        }        

        [HttpGet("{username}/events")]
        public async Task<IActionResult> GetUserEvents(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListEvents.Query{Username = username, Predicate = predicate}));
        }
    }
}