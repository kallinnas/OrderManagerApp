using AutoMapper;
using OrderManagerAPI.Models;
using OrderManagerAPI.Repositories;

namespace OrderManagerAPI.Services
{
    public class OrderService
    {
        private readonly OrderRepository orderRepository;
        private readonly CustomerRepository customerRepository;
        private readonly OrderDetailsRepository odRepository;
        private readonly IMapper mapper;

        public OrderService(OrderRepository orderRepository, CustomerRepository customerRepository, OrderDetailsRepository odRepository, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.customerRepository = customerRepository;
            this.odRepository = odRepository;
            this.mapper = mapper;
        }

        public async Task<ICollection<OrderDtoGetAll>> GetAllAsync()
        {
            return mapper.Map<ICollection<OrderDtoGetAll>>(await orderRepository.GetAllAsync());
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var orderToDelete = await orderRepository.GetByIdAsync(id);

            if (orderToDelete != null)
            {
                return await orderRepository.DeleteAsync(orderToDelete);
            }

            throw new Exception($"Order id{id} for deletion was not found.");
        }

        public async Task<Order> GetByIdAsync(int id)
        {
            var order = await orderRepository.GetByIdAsync(id);

            if (order != null)
            {
                return order;
            }

            throw new Exception($"Order id{id} was not found.");
        }

        public async Task<Order> AddAsync(OrderDtoAdd orderDto)
        {
            // MapperProfile has Map for orderDetails inside of order so added order gets into db with its details in one interaction
            var order = mapper.Map<Order>(orderDto);
            return await orderRepository.AddAsync(order);
        }

    }
}
