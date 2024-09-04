using AutoMapper;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Data;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<Order, OrderDtoGetAll>()
            .ForMember(des => des.EmployeeName, opt => opt.MapFrom(src => $"{src.Employee.FirstName} {src.Employee.LastName}"))
            .ForMember(des => des.CustomerName, opt => opt.MapFrom(src => src.Customer.Name))
            .ForMember(des => des.ShipperName, opt => opt.MapFrom(src => src.Shipper.Name))
            .ForMember(des => des.OrderTotalPrice, opt => opt.MapFrom(src => src.OrderDetails.Sum(od => od.Product.Price * od.Product.Unit)))
            .ReverseMap();

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
