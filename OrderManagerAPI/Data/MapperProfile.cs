using AutoMapper;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Data;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<OrderDtoAdd, Order>()
            .ForMember(dest => dest.Customer, opt => opt.Ignore())
            .ForMember(dest => dest.Employee, opt => opt.Ignore())
            .ForMember(dest => dest.Shipper, opt => opt.Ignore())
            .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));

        CreateMap<OrderDetailsDtoAddOrder, OrderDetails>()
            .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
            .ForMember(dest => dest.Product, opt => opt.Ignore())
            .ForMember(dest => dest.Order, opt => opt.Ignore())
            .ForMember(dest => dest.OrderId, opt => opt.Ignore())
            .ReverseMap();

    }
}
