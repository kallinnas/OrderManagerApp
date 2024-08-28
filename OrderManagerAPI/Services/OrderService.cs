using AutoMapper;
using OrderManagerAPI.Models.Dto;
using OrderManagerAPI.Repositories;

namespace OrderManagerAPI.Services
{
    public class OrderService
    {
        private readonly OrderRepository repository;
        private readonly IMapper mapper;

        public OrderService(OrderRepository repository, IMapper mapper) { 
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<ICollection<OrderDtoGetAll>> GetAllAsync()
        {
            return mapper.Map<ICollection<OrderDtoGetAll>>(await repository.GetAllAsync());
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var orderToDelete = await repository.GetByIdAsync(id);

            if (orderToDelete != null)
            {
                return await repository.DeleteAsync(orderToDelete);
            }

            throw new Exception($"Order id{id} for deletion was not found.");
        }
    }
}
