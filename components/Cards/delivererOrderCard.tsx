import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/reduxStore";
import { fetchStoreItems } from "../../app/reduxStore/storeItemSlice";
import { ExportSquare, InfoCircle } from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { PressableScale } from "react-native-pressable-scale";

const DelivererOrderCard = ({
  item,
  handleOpenOrder,
}: {
  item: any;
  handleOpenOrder: () => void;
}) => {
  
  const dispatch = useDispatch<any>();
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const id = item.storeId;

  useEffect(() => {
    dispatch(fetchStoreItems({ id, accessToken }));
  }, []);

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <PressableScale
      onPress={handleOpenOrder}
      className="border-b bg-[#121212] border-[#fffffc]/10  py-5 px-6 "
    >
      <View className="flex flex-row flex-1 justify-between items-end">
        <View className="flex flex-col gap-y-2">
          <Text
            style={{ fontFamily: "medium" }}
            className="text-white/60 text-xs"
          >
            Готова во: {formatTime(item.doneAt)}
          </Text>
          <Text style={{ fontFamily: "medium" }} className=" text-white mt-1">
            Број на нарачка: {item?.id}
          </Text>
        </View>

        <View className="flex flex-col gap-y-2">
          <View className="">
            <ExportSquare
              variant="Broken"
              className="self-end"
              size={16}
              color={Colors.white}
            />
          </View>
          <Text
            style={{ fontFamily: "semibold" }}
            className="text-white text-md "
          >
            <Text className="text-[#25D366]">{item?.totalPrice}</Text>
            <Text className="text-xs text-white/70"> ден</Text>
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};

export default DelivererOrderCard;
