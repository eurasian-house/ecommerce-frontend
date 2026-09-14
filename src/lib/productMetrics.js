import { supabase } from "./supabase";

const incrementMetric = async (functionName, productId) => {
  if (!productId) return;

  const { error } = await supabase.rpc(functionName, {
    row_id: productId,
  });

  if (error) {
    console.error(`Unable to increment product ${functionName}:`, error);
  }
};

export const incrementProductView = (productId) =>
  incrementMetric("increment_views", productId);
