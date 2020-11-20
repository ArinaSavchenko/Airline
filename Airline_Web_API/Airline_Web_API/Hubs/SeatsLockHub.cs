using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Hubs
{
    public class SeatsLockHub: Hub
    {
        public async Task AddToGroup(int flightId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, flightId.ToString());
        }

        public async Task LeaveGroup(int flightId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, flightId.ToString());
        }
    }
}
