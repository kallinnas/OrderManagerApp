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
            .ForMember(des => des.ShipperName, opt=> opt.MapFrom(src=> src.Shipper.Name))
            .ForMember(des=>des.OrderTotalPrice, opt=> opt.MapFrom(src=> src.OrderDetails.Sum(od=> od.Product.Price * od.Product.Unit)))
            .ReverseMap();

    }
}
